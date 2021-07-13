import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private httpClient: HttpClient) {}


    signUp(email: string, password: string) {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgjKrUL_kDKViTmK8iz-NuXmMALhHS6r4';
        
        return this.httpClient.post<AuthResponseData>(
            url, 
            {
                email: email, 
                password: password,
                authToken: true
            }
        )
    }
}