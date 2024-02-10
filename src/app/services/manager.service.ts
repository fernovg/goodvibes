import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http'
import { Environments } from "../../environments/env.constant";

@Injectable({
    providedIn: 'root'
})
export class ManagerService {
    constructor(
        private httpClient: HttpClient) { }

    get(endpoint: string, params?: any, requestOpts?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!requestOpts) {
                requestOpts = {
                    params: new HttpParams()
                };
            }
            if (params) {
                requestOpts.params = new HttpParams();
                for (const k of params) {
                    requestOpts.params = requestOpts.params.set(k, params[k]);
                }
            }

            this.httpClient.get(
                Environments.API_ENDPOINT + "/" + endpoint,
                requestOpts
            ).subscribe(r => {
                resolve(r);
            }, error => {
                reject(error);
            });
        })
    }

    post(endpoint: string, body: any, requestOpts?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.httpClient.post(
                Environments.API_ENDPOINT + "/" + endpoint,
                body,
                requestOpts
            ).subscribe(r => {
                resolve(r);
            }, error => {
                reject(error);
            });
        });

    }

    put(endpoint: string, body: any, requestOpts?: any) {
        return this.httpClient.put(
            Environments.API_ENDPOINT + "/" + endpoint,
            body,
            requestOpts
        );
    }

    delete(endpoint: string, requestOpts?: any) {
        return this.httpClient.delete(
            Environments.API_ENDPOINT + "/" + endpoint,
            requestOpts
        );
    }

    patch(endpoint: string, body: any, requestOpts?: any) {
        return this.httpClient.patch(
            Environments.API_ENDPOINT + "/" + endpoint,
            body,
            requestOpts
        );
    }
}