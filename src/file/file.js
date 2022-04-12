import express from "express";
import multer from "multer";
import { saveAvatar } from "../tools/fs.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// ------------------------------------
const fileRouter = express.Router();
// ------------------------------------
const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({ cloudinary, params: { folder: "M5-D6" } }),
}).single("avatar");
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
fileRouter.post("/cloudinaryUploader", cloudinaryUploader, (req, res, next) => {
  try {
    console.log(req.file);
    res.send();
  } catch (error) {}
});

export default fileRouter;
