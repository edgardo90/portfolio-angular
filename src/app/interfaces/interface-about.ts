export interface About{
    id?:number,
    title:string,
    summary:string,
    userName?:string,
}

export interface Errores{
    title?:string,
    summary?:string,
}

export const AboutArray : About[] = [] // esto sirve para hacerlo con  about.component , aca digo que "AboutArray" sea la interface que cree "About" de tipo array