

const bodyValidator = (schema) => {
  return async (req, res, next) => {
    try {
      const data = req.body;

    
      console.log(data);

      if (!data) {
        throw {
          code: 422,
          message: "Data not set",
          name: "VALIDATION_ERR",
        };
      }

      await schema.validateAsync(data, { abortEarly: false });
      next();
    } catch (exception) {
      //todo:
      let errorBag = {
        code: exception.code || null,
        message: exception.message,
        status: exception.name,
        detail: exception.details || null,
      };

      let messageBag = {};
      if (exception.details && exception.details.length) {
        exception.details.map((error) => {
          let key = error.path.pop();
          let message = error.message;

          messageBag[key] = message;
        });

        errorBag.detail = messageBag;
        errorBag.message = "Validation Error";
      }

      next(errorBag);
    }
  };
};

module.exports = bodyValidator;
