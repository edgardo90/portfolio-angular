export interface Banner{
    id?: number,
    imagenLink: string,
    userName: string,
}

export interface Errores{
    imagenLink?:string,
}

export const BARRNERarr : Banner[] = [] // esto sirve para hacerlo con  banner.component , aca digo que "BARRNERarr" sea la interface que cree "Banner" de tipo array