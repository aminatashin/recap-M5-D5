import express from "express";
import cors from "cors";
import myRouter from "./authors/authors.js";
import blogsRouter from "./blogs/blogs.js";
import fileRouter from "./file/file.js";
import { join } from "path";
import {
  badRequestError,
  unauthurizedError,
  notFoundError,
  genericError,
} from "./errorHandler/errorHandler.js";
import createError from "http-errors";
import { nextTick } from "process";
// -----------------------------------------
const server = express();
const { PORT } = process.env;
const publicPath = join(process.cwd(), "./public");
// -------------------------------------------
const whiteList = [process.env.FE_DEV_URL];
server.use(express.static(publicPath));
server.use(
  cors({
    origin: (origin, next) => {
      if (!origin || whiteList.indexOf(origin) !== -1) {
        next(null, true);
      } else {
        next(createError(400, "cors failed!!!"));
      }
    },
  })
);
server.use(express.json());

// ------------------END POINT-----------------
server.use("/authors", myRouter);
server.use("/blogs", blogsRouter);
server.use("/file", fileRouter);

// ---------------------------------------------
server.use(badRequestError);
server.use(unauthurizedError);
server.use(notFoundError);
server.use(genericError);
// ---------------------------------------------
server.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});
