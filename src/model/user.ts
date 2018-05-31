export class User {
    private _id: string;
    private _email: string;
    private _userStatus: number;
    private _createAt: Date;
    constructor(id: string, name: string, email: string, userStatus: number, createAt: Date) {
        this._id = id;
        this._email = email;
        this._userStatus = userStatus;
        this._createAt = createAt;
    }
    get id(): string {
        return this._id;
    }
    get email(): string {
        return this._email;
    }
    get userStatus(): number {
        return this._userStatus;
    }
    get createAt(): Date {
        return this._createAt;
    }
    set id(id: string) {
        this._id = id;
    }
    set email(email: string) {
        this._email = email;
    }
    set userStatus(userStatus: number) {
        this._userStatus = userStatus;
    }
    set createAt(createAt: Date){
        this._createAt = createAt;
    }
}
