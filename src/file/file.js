import express from "express";
import multer from "multer";
import { saveAvatar } from "../tools/fs.js";
// ------------------------------------
const fileRouter = express.Router();
// ------------------------------------

fileRouter.post(
  "/singleUpload",
  multer().single("avatar"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      await saveAvatar(req.file.originalname, req.file.buffer);
      res.send();
    } catch (error) {
      next(error);
    }
  }
);
export default fileRouter;
