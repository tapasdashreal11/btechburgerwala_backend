export const myProfile = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user, //req.user is coming from passport middleware
  });
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.status(200).json({
      message: "Logged Out",
    });
  });
};
