import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ManagerService } from './manager.service';
import { Environments } from 'src/environments/env.constant';

import { userReg, userEdit } from "../models/regisuser.models";
import { map } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Auth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private firestore = inject(Firestore);
  private authfirebase = inject(Auth);

  async login(Usuario: string, Password: string) {
    const userCred = await signInWithEmailAndPassword(this.authfirebase, Usuario, Password);
    const uid = userCred.user.uid;

    // Obtener documento del usuario en Firestore
    const userDocRef = doc(this.firestore, `usuarios/${uid}`);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error('El usuario no existe en la base de datos.');
    }

    const data = userDocSnap.data();

    // Validar el campo 'status'
    if (data['status'] === false) {
      // console.log('Acceso denegado: El status del usuario es false');
      throw new Error('Tu cuenta está desactivada. Contacta con el administrador.');
    }

    const dataUser = {
      uid: uid,
      nombre: data['Nombre'],
      apellidos: data['Apellidos'],
      nomcom: data['Nombre'] + ' ' + data['Apellidos'],
      email: data['email'],
      foto: data['foto'],
      tipouser: data?.['tipouser'],
      status: data['status']
    };

    localStorage.setItem('dataUser', JSON.stringify(dataUser));

    return dataUser;
  }

  async loginConGoogle() {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.authfirebase, provider);
    const user = cred.user;

    const uid = user.uid;
    const userDocRef = doc(this.firestore, `usuarios/${uid}`);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      const Nombre = user.displayName?.split(' ')[0] || '';
      const Apellidos = user.displayName?.split(' ').slice(1).join(' ') || '';

      await setDoc(userDocRef, {
        uid,
        Nombre,
        Apellidos,
        email: user.email,
        foto: user.photoURL,
        tipouser: 'user',
        status: true
      });
    }

    const finalSnap = await getDoc(userDocRef);
    const data = finalSnap.data();

    if (data && data['status'] === false) {
      throw new Error('Tu cuenta está desactivada. Contacta con el administrador.');
    }

    const dataUser = {
      uid,
      nombre: data?.['Nombre'],
      apellidos: data?.['Apellidos'],
      nomcom: `${data?.['Nombre']} ${data?.['Apellidos']}`,
      email: data?.['email'],
      foto: data?.['foto'],
      tipouser: data?.['tipouser'],
      status: data?.['status']
    };

    localStorage.setItem('dataUser', JSON.stringify(dataUser));

    return dataUser;
  }

  logout() {
    this.authfirebase.signOut();
    localStorage.removeItem('dataUser');
  }

    // Obtener los datos del usuario autenticado
  getUserData(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.authfirebase, async (user: User | null) => {
        if (user) {
          const uid = user.uid;
          const userDocRef = doc(this.firestore, `usuarios/${uid}`);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            resolve(userDoc.data());
          } else {
            reject('No se encontraron datos del usuario');
          }
        } else {
          reject('No hay usuario autenticado');
        }
      });
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('dataUser');
  }

}
