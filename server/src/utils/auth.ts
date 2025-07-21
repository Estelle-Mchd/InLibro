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
    });

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
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error("A token must be provided");
    }

    const secretKey = process.env.APP_SECRET;

    if (!secretKey) {
      throw new Error("A secret must be provided");
    }

    const verifyToken = jwt.verify(token, secretKey);

    if (verifyToken) {
      const { id, email } = verifyToken as JwtPayload;

      const newToken = jwt.sign({ id, email }, secretKey, { expiresIn: "1d" });
      res.cookie("token", newToken);
      res.status(200).json({ id, email });
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { hashPassword, login, logout, refreshToken };
