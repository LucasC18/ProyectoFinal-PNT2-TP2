import DatabaseFactory from '../databases/DatabaseFactory.js';
import UserDTO from '../dto/UserDTO.js';

export default class UserRepositorySupabase {
  constructor() {
    this.init();
  }

  async init() {
    this.supabase = await DatabaseFactory.getConnection();
  }

  // Obtener todos los usuarios
  async getAll() {
    const { data, error } = await this.supabase.from('usuarios').select('*');

    if (error) throw new Error(error.message);

    return data.map((usuario) => UserDTO.fromDataBase(usuario));
  }

  // Obtener un usuario por ID
  getOne = async (id) => {
    const { data, error } = await this.supabase.from('usuarios').select('*').eq('id', id).single();

    if (error) throw new Error(error.message);

    return UserDTO.fromDataBase(data);
  };

  // Crear un nuevo usuario
  createOne = async ({ nombre, precio, descripcion }) => {
    const { data, error } = await this.supabase
      .from('usuarios')
      .insert([{ nombre, apellido, mail, contrasena, rol }])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return ProductDto.fromDataBase(data);
  };

  // Actualizar un usuario por ID
  updateOne = async (id, { nombre, apellido, mail, contrasena, rol }) => {
    const { data, error } = await this.supabase
      .from('usuarios')
      .update({ nombre, apellido, mail, contrasena, rol })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return UserDTO.fromDataBase(data);
  };

  // Eliminar un usuario por ID
  deleteOne = async (id) => {
    const { data, error } = await this.supabase
      .from('usuarios')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return UserDTO.fromDataBase(data);
  };
}
