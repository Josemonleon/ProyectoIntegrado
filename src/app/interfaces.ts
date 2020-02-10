//Aquí se definen el formato que tienen las empresas(Empresa) que luego se usarán en los distintos ficheros
//Hay que exportar para que luego se puedan importar allá donde se necesite.
export interface IEmpresa{
    "Nombre": string,
    "Contacto": string,
    "Localidad": string,
    "Valoracion": number
}

export interface IAlumno {
    "Nombre": string,
    "Apellidos": string,
    "Curso": string,
    "Email": string,
    "Localidad": string,
    "Tutor": string,
    "Empresa": string,
    "Dni": string
}

export interface IAlumnoKey extends IAlumno{
    "key": string
}

export interface IEmpresaKey extends IEmpresa{
    "key": string
}

export interface IValoracion{
    "Comentario": string,
    "Empresa": string, //key de la empresa
    "Valoracion": number
}