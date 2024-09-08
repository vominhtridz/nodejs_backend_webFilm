import { AllowOrigin } from "./allowOrigin.js";

export const corsOptions = {
  origin: (origin, callback) => {
    if (AllowOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
