import express from "express";
import cors from "cors";
import myRouter from "./authors/authors.js";
import blogsRouter from "./blogs/blogs.js";
import fileRouter from "./file/file.js";
import {
  badRequestError,
  unauthurizedError,
  notFoundError,
  genericError,
} from "./errorHandler/errorHandler.js";
// -----------------------------------------
const server = express();
const port = 3001;
// -------------------------------------------
server.use(cors());
server.use(express.json());
const publicPath = join(process.cwd(), "./public");
// ------------------END POINT-----------------
server.use("/authors", myRouter);
server.use("/blogs", blogsRouter);
server.use("/file", fileRouter);
server.use(express.static(publicPath));

// ---------------------------------------------
server.use(badRequestError);
server.use(unauthurizedError);
server.use(notFoundError);
server.use(genericError);
// ---------------------------------------------
server.listen(port, () => {
  console.log(`Server is Running ${port}`);
});
