export interface Project{
    id?:number,
    title:string,
    image:string,
    description:string,
    linkFront:string,
    linkBack:string,
    linkProject:string,
    userName?:string
}

export interface Errores{
    title?:string,
    image?:string,
    description?:string,
    linkFront?:string,
    linkBack?:string,
    linkProject?:string,
}