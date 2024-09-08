import { AllowOrigin } from "../config/allowOrigin.js";

export const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (AllowOrigin.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
