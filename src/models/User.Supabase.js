export default class UserModelSupabase {

    constructor(id
        , nombre
        , apellido
        ,mail
        ,contrasena
        , descripcion
        ,esAdmin
        , embedding) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.mail = mail
        this.contrasena = contrasena
        this.descripcion = descripcion
        this.esAdmin = esAdmin
        this.embedding = embedding
    }

}