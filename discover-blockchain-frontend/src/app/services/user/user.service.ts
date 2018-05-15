import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/app.config';
import {User} from '../../models/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  /**
   * Return all users
   */
  getAll() {
    return this.http.get<User[]>(AppConfig.api.local + '/users');
  }

  /**
   * Return all users by ID
   */
  getById(_id: string) {
    return this.http.get(AppConfig.api.local + '/users/' + _id);
  }

  /**
   * Create new users
   */
  create(user: User) {
    return this.http.post(AppConfig.api.local + '/users/register', user);
  }

  /**
   * Update user
   */
  update(user: User) {
    return this.http.put(AppConfig.api.local + '/users/' + user.id, user);
  }

  /**
   * Delete user
   */
  delete(_id: string) {
    return this.http.delete(AppConfig.api.local + '/users/' + _id);
  }
}
