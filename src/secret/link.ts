export class Link {
    public static readonly HOST: string = 'http://192.168.0.106:8080';
    public static readonly CREATE_USER: string = '/user/create';
    public static readonly CREATE_USER_INFOR: string = '/userinfor/create';
    public static readonly LOGIN: string = '/user/login';
    public static readonly FIND_EMAIL: string = '/user/read/email';
    public static readonly FIND_FRIEND: string = '/user/read/friend';
    public static readonly FIND_ID: string = '/user/read/id';
    public static readonly FIND_PHONE: string = '/userinfor/read/phone';
    public static readonly AVATAR: string = 'assets/imgs/NLPige2.png';
    public static readonly UPDATE_AVATAR: string = '/userinfor/update/avatar';
    public static readonly UPDATE_USER_STATUS: string = '/user/update/s';
}