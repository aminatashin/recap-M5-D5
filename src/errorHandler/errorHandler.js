export const badRequestError = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ message: err.message, errorsList: err.errosList });
  } else {
    next(err);
  }
};
export const unauthurizedError = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(401).send({ message: "unauthurized !!!" });
  } else {
    next(err);
  }
};

export const notFoundError = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ message: err.message || "Not Found" });
  } else {
    next(err);
  }
};

export const genericError = (err, req, res, next) => {
  res.status(500).send({ message: "Generic Error!!!" });
};
