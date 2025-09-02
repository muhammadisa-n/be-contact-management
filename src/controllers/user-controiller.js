import userServices from "../services/user-services.js";
const register = async (req, res, next) => {
  try {
    const result = await userServices.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  try {
    const result = await userServices.login(req.body);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};
const get = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await userServices.get(username);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};
const update = async (req, res, next) => {
  try {
    const username = req.user.username;
    const request = req.body;
    request.username = username;
    const result = await userServices.update(request);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const mode = process.env.NODE_ENV;
    const response = await userServices.logout(
      req.user.username,
      req.cookies.sso_token
    );
    if (mode === "production") {
      res.clearCookie("sso_token", {
        path: "/",
        domain: ".muhammad-isa.my.id",
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
    }
    res.status(200).json({
      status: response,
    });
  } catch (e) {
    next(e);
  }
};
export default {
  register,
  login,
  get,
  update,
  logout,
};
