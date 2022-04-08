import { checkSchema, validationResult } from "express-validator";
import creatError from "http-errors";

const schema = {
  category: {
    in: ["body"],
    isString: {
      errorMessage: "The category validation has faild,needs string!!!",
    },
  },

  title: {
    in: ["body"],
    isString: {
      errorMessage: "The Title validation has faild,needs string!!!",
    },
  },
  cover: {
    in: ["body"],
    isString: {
      errorMessage: "The Cover validation has faild,needs string!!!",
    },
  },
  "readTime.value": {
    in: ["body"],
    isNumeric: {
      errorMessage:
        "The  readTime.value validation has faild,needs numeric value!!!",
    },
  },
  "readTime.unit": {
    in: ["body"],
    isString: {
      errorMessage:
        "The  readTime.unit validation has faild,needs string value!!!",
    },
  },
  "author.name": {
    in: ["body"],
    isString: {
      errorMessage:
        "The  author.name validation has faild,needs string value!!!",
    },
  },
  avatar: {
    in: ["body"],
    isString: {
      errorMessage:
        "The  avatar link validation has faild,needs string value!!!",
    },
  },
  content: {
    in: ["body"],
    isString: {
      errorMessage: "The  content validation has faild,needs string value!!!",
    },
  },
};
export const checkPageSchema = checkSchema(schema);
export const checkPageValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(creatError(400, "validation faild", { errorsList: errors.array() }));
  } else {
    next();
  }
};
