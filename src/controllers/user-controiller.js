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
    await userServices.logout(req.user.username);
    res.status(200).json({
      data: "OK",
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
