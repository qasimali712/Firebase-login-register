import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //userData: any;
  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase
  ) {}
  async getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.onAuthStateChanged(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async registerUser(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = userCredential.user;
      await this.afDatabase.object(`users/${uid}`).set({
        address: 'User Address',
        // Add more properties as needed
      });
      //await this.afDatabase.object(`users/${uid}`).set(this.userData);
    } catch (error) {}
  }

  async loginUser(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      // Additional actions after successful login
    } catch (error) {
      // Handle login error (e.g., display error message)
    }
  }

  async logoutUser(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Successful Logout')
    } catch (error) {
      // Handle logout error (e.g., display error message)
    }
  }
}
