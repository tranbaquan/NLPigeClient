import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Link } from '../secret/link';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from '@firebase/util';
import { ResponseCode } from '../secret/response-code';

@Injectable()
export class UserService {
    constructor(
        private http: Http
    ) { }

    public createUser(email: string, password: string): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify({
            email: email,
            password: password
        })
        return this.http.post(Link.HOST + Link.CREATE_USER, data, options).toPromise();
    }

    public login(email: string, password: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify({
            email: email,
            password: password
        })
        return this.http.post(Link.HOST + Link.LOGIN, data, options).toPromise();
    }

    public findEmail(email: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'email': email
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(Link.HOST + Link.FIND_EMAIL, options);
    }
    public findId(id: number) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'id': id
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(Link.HOST + Link.FIND_ID, options);
    }

    public getInforFriends(arr: any[]) {
        let friends: any[];
        friends = [];
        arr.forEach(element => {
            this.findId(element.id).toPromise()
                .then(data => {
                    if (data.status == ResponseCode.OK) {
                        friends.push(data.json());
                    }
                });
        });
        return friends;
    }

    updateStatus(user) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(Link.HOST + Link.UPDATE_USER_STATUS, JSON.stringify(user), options).toPromise();
    }
    
    findFriend(val: string): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'email' : val
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(Link.HOST + Link.FIND_FRIEND, options).toPromise();
    }
}