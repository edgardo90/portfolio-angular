//interface para el login
export interface LoginUser{
    userName:string,
    password:string,
}

export interface Errores{
    userName?: string,
    password?:string,
}