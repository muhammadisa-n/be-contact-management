import {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import axios from "axios";
import "dotenv/config";

const register = async (request) => {
  const user = validate(registerUserValidation, request);
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });
  if (countUser === 1) {
    throw new ResponseError(400, "Username Already Exists");
  }

  user.password = await bcrypt.hash(user.password, 10);
  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};
const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });
  if (!user) {
    throw new ResponseError(401, "Username or Password Wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or Password Wrong");
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: { token: token },
    where: { username: user.username },
    select: { token: true },
  });
};
const get = async (username) => {
  username = validate(getUserValidation, username);
  const user = await prismaClient.user.findUnique({
    where: { username: username },
    select: { username: true, name: true },
  });
  if (!user) {
    throw new ResponseError(404, "user is not found");
  }
  return user;
};
const update = async (request) => {
  const user = validate(updateUserValidation, request);
  const totalUserInDatabase = await prismaClient.user.count({
    where: { username: user.username },
  });
  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User Is not found");
  }
  const data = {};
  if (user.name) {
    data.name = user.name;
  }
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    data: data,
    where: { username: user.username },
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (username) => {
  username = validate(getUserValidation, username);
  const mode = process.env.NODE_ENV;
  if (mode === "development") {
    const user = await prismaClient.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      throw new ResponseError(404, "User is not found");
    }
    return prismaClient.user.update({
      where: { username: username },
      data: { token: null },
      select: {
        username: true,
      },
    });
  }

  try {
    const ssoResponse = await axios.get(
      `${process.env.SSO_SERVICE_URL}/api/logout`,
      {
        headers: {
          "x-app-key": process.env.SSO_API_KEY,
          withCredentials: true,
        },
      }
    );

    if (ssoResponse.status !== 200) {
      return res.status(401).json({ errors: "Unauthorized" });
    }
    return res.status(200).json({ message: "Logged out" });
  } catch (err) {
    return res.status(401).json({ errors: "Unauthorized" });
  }
};

export default {
  register,
  login,
  get,
  update,
  logout,
};
