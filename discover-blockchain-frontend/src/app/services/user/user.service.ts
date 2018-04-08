import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/app.config';
import {User} from '../../models/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(AppConfig.api.local + '/users');
  }

  getById(_id: string) {
    return this.http.get(AppConfig.api.local + '/users/' + _id);
  }

  create(user: User) {
    return this.http.post(AppConfig.api.local + '/users/register', user);
  }

  update(user: User) {
    return this.http.put(AppConfig.api.local + '/users/' + user.id, user);
  }

  delete(_id: string) {
    return this.http.delete(AppConfig.api.local + '/users/' + _id);
  }
}
