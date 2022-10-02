//service para el token
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string>  = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY); // elemina el token que alla el window.sessionStorage
    window.sessionStorage.setItem(TOKEN_KEY, token); // copia(guarda) el nuevo token que la variable es "token"
  }

  public getToken():string {
    return sessionStorage.getItem(TOKEN_KEY)!; //  el signo de admiracion(!) es porque no esta inicializado
  }

  public setUserName(userName: string): void{
    window.sessionStorage.removeItem(USERNAME_KEY);  // elemina el USERNAME_KEY que alla el window.sessionStorage
    window.sessionStorage.setItem(USERNAME_KEY, userName);// copia(guarda) el nuevo userName que la variable es "userName "
  }

  public getUserName():string {
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  public setAuthorities(authorities: string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY); // elemina el AUTHORITIES_KEY que alla el window.sessionStorage
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));// copia(guarda) el nuevo AUTHORITIES_KEY que la variable es "authorities "
  }

  public getAuthorities(): string[]{
    this.roles = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority:any) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  public logOut(): void{
    window.sessionStorage.clear();
  }
  
}
