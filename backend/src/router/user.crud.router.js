import { Router } from "express";
import UserController from "../controllers/User.js";
import validateToken from "../auth/validateToken.js";

const UserRouter = Router();

// ======================================================
// 📌 OBTENER TODOS LOS USUARIOS (ADMIN)
// GET /users
// ======================================================
UserRouter.get("/", validateToken, async (req, res) => {
  try {
    const result = await UserController.getAll(req.user);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

// ======================================================
// 📌 CREAR USUARIO (ADMIN)
// POST /users
// ======================================================
UserRouter.post("/", validateToken, async (req, res) => {
  try {
    const created = await UserController.create(req.body, req.user);
    return res.status(201).json(created);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

// ======================================================
// 📌 OBTENER USUARIO POR ID (ADMIN)
// GET /users/:id
// ======================================================
UserRouter.get("/:id", validateToken, async (req, res) => {
  try {
    const user = await UserController.getById(req.params.id, req.user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

// ======================================================
// 📌 ACTUALIZAR USUARIO POR ID (ADMIN)
// PUT /users/:id
// ======================================================
UserRouter.put("/:id", validateToken, async (req, res) => {
  try {
    const updated = await UserController.update(req.params.id, req.body, req.user);
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

// ======================================================
// 📌 ELIMINAR USUARIO (ADMIN)
// DELETE /users/:id
// ======================================================
UserRouter.delete("/:id", validateToken, async (req, res) => {
  try {
    const deleted = await UserController.delete(req.params.id, req.user);
    return res.status(200).json(deleted);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
});

export default UserRouter;
