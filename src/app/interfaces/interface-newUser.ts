//interface para la creacion del usuario
export interface NewUser{ // controla el type de datos que va ser y que datos va a tener , para eso sirve "interface"
    name: string,
    userName: string,
    email:string,
    password:string,
}

export interface Errores{
    name?: string,
    userName?: string,
    email?:string,
    password?:string,
}