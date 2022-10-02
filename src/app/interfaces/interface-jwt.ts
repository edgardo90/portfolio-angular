//interface que va tener el JsToken
export interface Jwt{
    token: string,
    bearer: string,
    nombreUsuario: string,
    authorities: string[], // va ser un array de string
}