const z = require("zod");

const authorSchema = z.object({
  name: z
    .string({
      invalid_type_error: "The name must be a string",
      required_error: "The name field is required",
    })
    .min(3, {
      message: "The name field must have at least three characters",
    }),
  email: z
    .string({
      invalid_type_error: "The email must be a string",
      required_error: "The email field is required",
    })
    .email({ message: "Invalid email address" }),
  image: z
    .string({
      invalid_type_error: "The image must be a string",
      required_error: "The image field is required",
    })
    .url({ message: "Invalid url" }),
});

const idAuthorSchema = z
  .number({
    required_error: "idAuthor is required",
    invalid_type_error: "idAuthor must be a number",
  })
  .positive({
    message: "IdAuthor must be positive",
  });

const validateAuthor = (object) => {
  return authorSchema.safeParse(object);
};

const validateIdAuthor = (number) => {
  return idAuthorSchema.safeParse(number);
};
module.exports = { validateAuthor, validateIdAuthor };
