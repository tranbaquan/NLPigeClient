import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Link } from '../secret/link';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    constructor(
        private http:Http
    ){}
    
    public createUser(email: string, password: string): Promise<any>{
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          let options = new RequestOptions({ headers: headers});
          let data = JSON.stringify({
            email: email,
            password: password
          })
          return this.http.post(Link.HOST + Link.CREATE_USER, data, options).toPromise();
    }

    public findEmail(email: string) {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          let options = new RequestOptions({ headers: headers});
          let data = JSON.stringify({
            email: email
          })
          return this.http.post(Link.HOST + Link.FIND_EMAIL, data, options).toPromise();
    }
}