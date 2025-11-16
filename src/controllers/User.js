import { RepositoryFactory } from "../repositories/RepositoryFactory.js";

const UserRepository = RepositoryFactory.getRepository();

export const UserController = {
    // Obtener todos los usuarios
    getAllUsers: async (request, response) => {
        try {
            const users = await UserRepository.getAll();

            response.status(200).json({
                message: "OK",
                payload: users,
            });
        } catch (error) {
            console.error("Error al obtener los usuarios:", error.message);
            response.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // Obtener usuario por ID
    getById: async (request, response) => {
        try {
            const { id } = request.params;
            const user = await UserRepository.getOne(id);

            if (!user) {
                return response.status(404).json({ error: "Producto no encontrado" });
            }

            response.status(200).json({
                message: "OK",
                payload: user,
            });
        } catch (error) {
            console.error("Error al obtener usuario por ID:", error.message);
            response.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // Crear usuario desde JSON (body)
    createByJson: async (request, response) => {
        try {
            const {nombre, apellido, mail, contrasena, rol } = request.body;

            if (!nombre || !apellido || !mail || !contrasena || !rol) {
                return response.status(400).json({ error: "Faltan campos requeridos" });
            }

            const newUser = await UserRepository.createOne({
                nombre,
                apellido,
                mail,
                contrasena,
                rol
            });

            response.status(201).json({
                message: "Usuario creado correctamente",
                payload: newUser,
            });
        } catch (error) {
            console.error("Error al crear usuario:", error.message);
            response.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // Actualizar usuario desde JSON (body)
    updateByJson: async (request, response) => {
        try {
            const { id, nombre, apellido, mail, contrasena, rol } = request.body;

            if (!id) {
                return response.status(400).json({ error: "El ID del usuario es obligatorio" });
            }

            const updated = await UserRepository.updateOne(id, {
                nombre,
                apellido,
                mail,
                contrasena,
                rol
            });

            response.status(200).json({
                message: "Uusario actualizado correctamente",
                payload: updated,
            });
        } catch (error) {
            console.error("Error al actualizar usuario:", error.message);
            response.status(500).json({ error: "Error interno del servidor" });
        }
    },

    // Eliminar usuario por ID
    deleteById: async (request, response) => {
        try {
            const { id } = request.params;

            const deleted = await UserRepository.deleteOne(id);

            response.status(200).json({
                message: "Usuario eliminado correctamente",
                payload: deleted,
            });
        } catch (error) {
            console.error("Error al eliminar usuario:", error.message);
            response.status(500).json({ error: "Error interno del servidor" });
        }
    },
};