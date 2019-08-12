export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenEpiration: Date) {}

  get token() {
    if (!this._tokenEpiration || new Date() > this._tokenEpiration) {
      return null;
    } else {
      return this._token;
    }
  }
}
