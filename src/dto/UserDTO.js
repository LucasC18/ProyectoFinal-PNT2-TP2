export default class UserDto {
  static fromDataBase(user) {
    return {
      id: user?.id ?? user._id,
      nombre: user.nombre.toUpperCase(),
      apellido: user.apellido.toUpperCase(),
      mail: user.mail.toUpperCase(),
    };
  }
}
