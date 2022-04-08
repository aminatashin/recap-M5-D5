import express from "express";
import { getBlogs, writeBlogs } from "../tools/fs.js";
import creatError from "http-errors";
import uniqid from "uniqid";
import {
  checkPageSchema,
  checkPageValidationResult,
} from "../validation/validator.js";

const blogsRouter = express();

blogsRouter.post(
  "/",
  checkPageSchema,
  checkPageValidationResult,
  async (req, res, next) => {
    try {
      const newThing = { ...req.body, creatAt: new Date(), id: uniqid() };
      const blogRead = await getBlogs();
      blogRead.push(newThing);
      await writeBlogs(blogRead);
      res.send(blogRead);
    } catch (error) {
      next(error);
    }
  }
);
blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogRead = await getBlogs();
    if (req.query && req.query.category) {
      const filterBlog = blogRead.filter(
        (x) => x.category === req.query.category
      );
      res.send(filterBlog);
    } else {
      res.send(blogRead);
    }
  } catch (error) {
    next(error);
  }
});
blogsRouter.get("/:blogsId", async (req, res, next) => {
  try {
    const blogRead = await getBlogs();
    const findBlog = blogRead.find((find) => find.id === req.params.blogsId);
    if (findBlog) {
      res.send(findBlog);
    } else {
      next(creatError(404, "page not found!!!"));
    }
  } catch (error) {
    next(error);
  }
});
blogsRouter.put("/:blogsId", async (req, res, next) => {
  try {
    const blogRead = await getBlogs();
    const index = blogRead.findIndex((find) => find.id === req.params.blogsId);
    if (index !== -1) {
      const oldBlog = blogRead[index];
      const updateBlog = { ...oldBlog, ...req.body, updateAt: new Date() };
      blogRead[index] = updateBlog;
      await writeBlogs(blogRead);
      res.send(blogRead);
    } else {
      next(creatError(404, "page not Found!!!"));
    }
  } catch (error) {
    next(error);
  }
});
blogsRouter.delete("/:blogsId", async (req, res, next) => {
  try {
    const blogRead = await getBlogs();
    const deleteBlog = blogRead.filter((x) => x.id !== req.params.blogsId);
    res.send(deleteBlog);
  } catch (error) {
    next(error);
  }
});
// --------------------------------
export default blogsRouter;