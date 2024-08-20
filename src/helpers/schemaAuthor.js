/**
 * @module SchemaAuthor
 *
 * Este módulo define y exporta esquemas de validación para autores y sus identificadores utilizando la librería Zod.
 * Proporciona funciones para validar objetos de autor y su ID, asegurando que los datos cumplan con los requisitos establecidos.
 *
 * @requires zod
 */
const z = require("zod");

/**
 * Esquema de validación para un objeto de autor.
 * Verifica que los campos `name`, `email`, e `image` sean cadenas de texto válidas,
 * con restricciones adicionales como longitud mínima y formato correcto de URL y email.
 *
 * @constant {ZodObject}
 */
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

/**
 * Esquema de validación para el identificador de un autor (idAuthor).
 * Verifica que el identificador sea un número positivo.
 *
 * @constant {ZodNumber}
 */
const idAuthorSchema = z
  .number({
    required_error: "idAuthor is required",
    invalid_type_error: "idAuthor must be a number",
  })
  .positive({
    message: "IdAuthor must be positive",
  });

/**
 * Valida un objeto de autor según el esquema `authorSchema`.
 *
 * @function validateAuthor
 * @param {Object} object - El objeto que representa al autor, que debe incluir `name`, `email`, e `image`.
 * @returns {ZodSafeParseResult} Resultado de la validación, que incluye un valor validado o errores.
 */
const validateAuthor = (object) => {
  return authorSchema.safeParse(object);
};

/**
 * Valida un identificador de autor según el esquema `idAuthorSchema`.
 *
 * @function validateIdAuthor
 * @param {number} number - El número que representa el identificador del autor.
 * @returns {ZodSafeParseResult} Resultado de la validación, que incluye un valor validado o errores.
 */
const validateIdAuthor = (number) => {
  return idAuthorSchema.safeParse(number);
};
module.exports = { validateAuthor, validateIdAuthor };
