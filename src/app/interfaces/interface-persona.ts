export interface Persona{
    id?:number,
    name:string,
    surname:string,
    imagen:string,
    phone:string,
    email:string,
    country:string,
    userName?:string,
}
export interface Errores{
    name?:string,
    surname?:string,
    imagen?:string,
    phone?:string,
    email?:string,
    country?:string,
}

export const PersonArray : Persona[] = []