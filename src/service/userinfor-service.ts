import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Link } from '../secret/link';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from '@firebase/util';
import { ResponseCode } from '../secret/response-code';

@Injectable()
export class UserInforService {
    constructor(
        private http:Http
    ){}

    public createInfor(infor: any):Promise<any>{
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        let options = new RequestOptions({ headers: headers});
        return this.http.post(Link.HOST + Link.CREATE_USER_INFOR,  JSON.stringify(infor), options).toPromise();
    }

    public findPhone(phone: string): Promise<any> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'phone': phone
        });
        let options = new RequestOptions({ headers: headers});
        return this.http.get(Link.HOST + Link.FIND_PHONE, options).toPromise();
    }

    public updateAvatar(avatar: string, id: number): Promise<any> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        let data = JSON.stringify({
            idUser: id,
            avatar: avatar
        })
        let options = new RequestOptions({ headers: headers});
        return this.http.put(Link.HOST + Link.UPDATE_AVATAR, data, options).toPromise();
    }
}