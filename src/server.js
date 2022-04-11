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
// -----------------------------------------
const server = express();
const port = process.env.port || 3001;
const publicPath = join(process.cwd(), "./public");
// -------------------------------------------
const whiteList = [process.env.FE_DEV_URL];
server.use(express.static(publicPath));
server.use(
  cors({
    origin: function (origin, next) {
      if (!origin || whiteList.indexof(origin !== -1)) {
        next(null, true);
      } else {
        next(createError(400, "CORS Error"));
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
server.listen(port, () => {
  console.log(`Server is Running ${port}`);
});
