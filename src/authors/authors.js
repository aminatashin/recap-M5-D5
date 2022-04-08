import express from "express";
import uniqid from "uniqid";
import { getAuthor, writeAuthor } from "../tools/fs.js";
import creatError from "http-errors";
import {
  checkPageSchema,
  checkPageValidationResult,
} from "../validation/validator.js";
// --------------------------------
const myRouter = express.Router();
// --------------------------------
myRouter.post(
  "/",
  checkPageSchema,
  checkPageValidationResult,
  async (req, res, next) => {
    try {
      const newThing = { ...req.body, creatAt: new Date(), id: uniqid() };
      const authorRead = await getAuthor();
      authorRead.push(newThing);
      await writeAuthor(authorRead);
      res.send(authorRead);
    } catch (error) {
      next(error);
    }
  }
);
myRouter.get("/", async (req, res, next) => {
  try {
    const authorRead = await getAuthor();
    if (req.query && req.query.category) {
      const filterAuthor = authorRead.filter(
        (x) => x.category === req.query.category
      );
      res.send(filterAuthor);
    } else {
      res.send(authorRead);
    }
  } catch (error) {
    next(error);
  }
});
myRouter.get("/:authorId", async (req, res, next) => {
  try {
    const authorRead = await getAuthor();
    const findAuthor = authorRead.find(
      (find) => find.id === req.params.authorId
    );
    if (findAuthor) {
      res.send(findAuthor);
    } else {
      next(
        creatError(404, `page with this ${req.params.authorId} not found!!!`)
      );
    }
  } catch (error) {
    next(error);
  }
});
myRouter.put("/:authorId", async (req, res, next) => {
  try {
    const authorRead = await getAuthor();
    if (index !== -1) {
      const index = authorRead.findIndex(
        (find) => find.id === req.params.authorId
      );
      const oldAuthor = authorRead[index];
      const updateAuthor = { ...oldAuthor, ...req.body, updateAt: new Date() };
      authorRead[index] = updateAuthor;
      await writeAuthor(authorRead);
      res.send(authorRead);
    } else {
      next(creatError(404, "page not Found!!!"));
    }
  } catch (error) {
    next(error);
  }
});
myRouter.delete("/:authorId", async (req, res, next) => {
  try {
    const authorRead = await getAuthor();
    const deletAuthor = authorRead.filter((x) => x.id !== req.params.authorId);
    res.send(deletAuthor);
  } catch (error) {
    next(error);
  }
});
// --------------------------------
export default myRouter;
