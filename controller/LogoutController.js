import User from "..//model/UserModel.js";
export const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  const refreshToken = cookies.jwt;
  // find users exists
  const FoundUser = await User.findOne({refreshToken}).exec()
  if (!FoundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(403);
  }
  //  delete refresh token
  FoundUser.refreshToken = ''
  const result = await FoundUser.save()
  console.log(result)
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  return res.status(204).json({ message: "Đăng Xuất Thành Công!" });
};
