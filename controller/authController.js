import User from "..//model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const authUser = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email và Mật Khẩu không bỏ trống !" });
  // find users exists
  const FoundUser = await User.findOne({ email }).exec();
  if (!FoundUser) return res.status(401).json({ message: "Email không đúng" }); // unauthorized
  try {
    const result = await bcrypt.compare(pwd, FoundUser.password)
      if (result) {
        const roles = Object.values(FoundUser.roles);
        const AccessToken = jwt.sign(
          {
            UserInfor: { email: FoundUser.email, roles: roles },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
          { email: FoundUser.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        FoundUser.refreshToken = refreshToken;
        await FoundUser.save()
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          MaxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ AccessToken });
      } else res.status(401).json({ message: `Mật khẩu không đúng` });
    
  } catch (err) {
    // Handle error
    console.log(err);
    res.status(500).json({ Message: "Server bị lỗi", Error: err.message });
  }
};
