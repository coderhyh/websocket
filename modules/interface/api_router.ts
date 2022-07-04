import { Router } from "express";
import upload from "../utils/upload";
import required from "../utils/required";

import signup from "../interface/signup";
module.exports = (api_router: Router) => {
  api_router.post(
    "/signup",
    upload.single("avatar"),
    required(["userName", "passWord", "avatar"]),
    signup
  );
};
