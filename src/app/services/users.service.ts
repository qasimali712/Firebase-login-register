import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://project1-18842-default-rtdb.firebaseio.com/logins';
  constructor(
    private afDatabase: AngularFireDatabase,
    private http: HttpClient
  ) {}

  getUserData(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afDatabase
        .object(`users/${uid}`)
        .valueChanges()
        .subscribe(
          (userData) => {
            resolve(userData);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  async updateUserData(uid: string, newData: any): Promise<any> {
    try {
      await this.afDatabase.object(`users/${uid}`).update(newData);
      const updatedUserData = await this.getUserData(uid);
      return updatedUserData;
    } catch (error) {
      throw error;
    }
  }
  async getUser(): Promise<any> {
    try {
      const url = `${this.apiUrl}/user.json`;
      const response = await this.http.get(url).toPromise();
      return response;
    } catch (error) {
      // Handle error fetching login data
      throw error;
    }
  }
  async getDriver(): Promise<any> {
    try {
      const url = `${this.apiUrl}/driver.json`;
      const response = await this.http.get(url).toPromise();
      return response;
    } catch (error) {
      // Handle error fetching login data
      throw error;
    }
  }
}
