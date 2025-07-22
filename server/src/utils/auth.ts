import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import usersRepository from "../modules/users/usersRepository";

const secretKey = process.env.APP_SECRET;
if (!secretKey) {
  throw new Error("APP_SECRET must be defined in environment");
}

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hash = await argon2.hash(password, {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    });

    req.body.password = hash;

    next();
  } catch (err) {
    res.sendStatus(500);
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersRepository.readByEmail(email);

    if (!user) {
      throw new Error("This user doesn't exist");
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    console.log("Set-Cookie header:", res.getHeader("Set-Cookie"));

    res.status(200).json(payload);
  } catch (err) {
    res.sendStatus(500);
  }
};

const logout: RequestHandler = (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

const refreshToken: RequestHandler = (req, res) => {
  const token = req.cookies.token;
  console.log("Cookies:", req.cookies);
  console.log("Token reçu dans le cookie :", token);

  if (!token) {
    console.error("No token in cookies");
    res.sendStatus(401);
    return;
  }

  let payload: JwtPayload;
  try {
    payload = jwt.verify(token, secretKey) as JwtPayload;
  } catch (err) {
    console.error("Échec de vérification du token :", err);
    res.sendStatus(401);
    return;
  }

  const newToken = jwt.sign(
    { id: payload.id, email: payload.email, role: payload.role },
    secretKey,
    { expiresIn: "1d" },
  );

  res.cookie("token", newToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    id: payload.id,
    email: payload.email,
    role: payload.role,
  });
};

export default { hashPassword, login, logout, refreshToken };
