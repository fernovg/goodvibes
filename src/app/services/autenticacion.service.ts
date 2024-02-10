import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Environments } from "../../environments/env.constant";
import { userInfo } from "../models/users.models";
import { ManagerService } from "./manager.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<userInfo>;
    public currentUser: Observable<userInfo>;

    constructor(private http: HttpClient, private managerservice: ManagerService) {
        this.currentUserSubject = new BehaviorSubject<userInfo>(
            JSON.parse(localStorage.getItem("currentUser") || 'null')
        );
        this.currentUser = this.currentUserSubject.asObservable();

    }

    public get currentUserValue(): userInfo {
        return this.currentUserSubject.value;
    }

    authenticate(data:any) { 
        const body = new HttpParams()
            .set('Usuario',data.Usuario)
            .set('Password', data.Password)    
        return this.http.post<any>(`${Environments.API_ENDPOINT}/auth/login.php`, body).pipe(
            map((userInfo:userInfo) => {
                if (userInfo.result) {
                    localStorage.setItem("currentUser", JSON.stringify(userInfo)); 
                    this.currentUserSubject.next(userInfo);                    
                }
                return userInfo;
            })
        )
    }

    logout() {      
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next({});      
    }
}