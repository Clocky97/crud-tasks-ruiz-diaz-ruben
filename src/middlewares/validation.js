import { body, param } from "express-validator";

export const validateUser = [
  body("username")
    .notEmpty().withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3 }).withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
  body("email")
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe ser un email válido"),
  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const validateUserId = [
  param("id")
    .isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo"),
];