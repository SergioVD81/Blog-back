const z = require("zod");

const postSchema = z.object({
  title: z
    .string({
      invalid_type_error: "The title field must be a string",
      required_error: "Title is required",
    })
    .max(45, {
      message: "The title must no exceed forty-five characters",
    })
    .min(3, {
      message: "The title must have at least three characters",
    }),
  description: z
    .string({
      invalid_type_error: "The description field must be a string",
      required_error: "Description is required",
    })
    .max(16777210, {
      message: "The title must no exceed 16777210 characters",
    }),
  category: z.enum([
    "Informativo",
    "Educativo",
    "Publicitario",
    "De concientizacion",
    "De actualidad",
    "De terceros",
  ]),
});

const validatePost = (object) => {
  return postSchema.safeParse(object);
};

module.exports = { validatePost };
