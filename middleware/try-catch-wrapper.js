// to remove the messy try-catch from taskController
const tryCatchWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = tryCatchWrapper;
