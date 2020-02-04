//Aquí se definen el formato que tienen las empresas(Empresa) que luego se usarán en los distintos ficheros
//Hay que exportar para que luego se puedan importar allá donde se necesite.
export interface IEmpresa{
    "Nombre": string,
    "Contacto": string,
    "Localidad": string
}

export interface IAlumno {
    "Nombre": string,
    "Apellidos": string,
    "Curso": string,
    "Email": string,
    "Localidad": string,
    "Tutor": string
}

export interface IEmpresaKey extends IEmpresa{
    "key": string
}