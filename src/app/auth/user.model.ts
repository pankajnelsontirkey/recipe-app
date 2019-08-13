export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenExpiration: Date) {}

  get token() {
    if (!this._tokenExpiration || this._tokenExpiration < new Date()) {
      return null;
    } else {
      return this._token;
    }
  }
}
