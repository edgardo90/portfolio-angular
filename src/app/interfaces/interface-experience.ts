export interface Experience{
    id?:number,
    title:string,
    companyName:string,
    dateStart:string,
    dateEnd:string,
    logoCompany:string,
    description:string,
    userName?:string
}

export interface Errores{
    title?:string,
    companyName?:string,
    dateStart?:string,
    dateEnd?:string,
    logoCompany?:string,
    description?:string,
}