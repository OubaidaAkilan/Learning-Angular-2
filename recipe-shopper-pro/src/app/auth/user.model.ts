export class User {
    constructor (
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationData: Date
    ) { }

    // This is a special property called getter (user.token)
    get token(): string {
        return !this._tokenExpirationData || new Date() > this._tokenExpirationData
            ? ''
            : this._token;
    }
}
