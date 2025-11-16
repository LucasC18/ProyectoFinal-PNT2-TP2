export default class UserModelSupabase {
  constructor(id, nombre, apellido, mail, contrasena, rol, embedding) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.mail = mail;
    this.contrasena = contrasena;
    this.rol = rol;
    this.embedding = embedding;
  }
}
