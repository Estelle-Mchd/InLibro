import type { RequestHandler } from "express";

const userValidation: RequestHandler = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isEmailValid = email.match(
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/,
    );

    if (!email || !password) {
      res.status(403).json("This field cannot be empty.");
    } else if (!isEmailValid) {
      res.status(403).json("The email format is invalid.");
    } else if (password.length < 8) {
      res.status(403).json("The password must contain at least 8 characters.");
    } else {
      next();
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { userValidation };
