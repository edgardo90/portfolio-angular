export interface Education{
    id?:number,
    institution:string,
    titleName:string,
    startDate:string,
    endDate:string,
    description:string,
    institutionLogo:string,
    certificateLink:string,
    userName?:string
}

export interface Errores{
    institution?:string,
    titleName?:string,
    startDate?:string,
    endDate?:string,
    description?:string,
    institutionLogo?:string,
    certificateLink?:string,
}
