import { Router } from "express";
import upload from "../utils/upload";
import required from "../utils/required";

import signup from "../interface/signup";
import login from "../interface/login";
import userInfo from "../interface/userInfo";
module.exports = (api_router: Router) => {
  api_router.post(
    "/signup",
    upload.single("avatar"),
    required(["userName", "passWord", "avatar"]),
    signup
  );

  api_router.post(
    "/login",
    required(["userName", "passWord"]),
    login
  );

  api_router.post(
    "/userInfo",
    required(["token"]),
    userInfo
  );
};
