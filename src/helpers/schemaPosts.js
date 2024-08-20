/**
 * @module schemaPosts
 *
 * Este módulo define y exporta esquemas de validación para objetos de tipo "Post" utilizando la librería Zod.
 * Proporciona una función para validar objetos de publicaciones, asegurando que los datos cumplan con los requisitos establecidos.
 *
 * @requires zod
 */
const z = require("zod");

/**
 * Esquema de validación para un objeto de tipo "Post".
 * Verifica que los campos `title`, `description`, y `category` cumplan con las restricciones de tipo y longitud.
 *
 * @constant {ZodObject}
 */
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

/**
 * Valida un objeto de tipo "Post" según el esquema `postSchema`.
 *
 * @function validatePost
 * @param {Object} object - El objeto que representa un post, que debe incluir `title`, `description`, y `category`.
 * @returns {ZodSafeParseResult} Resultado de la validación, que incluye un valor validado o errores.
 */
const validatePost = (object) => {
  return postSchema.safeParse(object);
};

module.exports = { validatePost };
