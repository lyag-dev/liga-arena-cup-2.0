import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  // Login com E-mail e Palavra-passe
  async login(email: string, pass: string) {
    return await signInWithEmailAndPassword(this.auth, email, pass);
  }

  // Registo com E-mail e Palavra-passe
  async register(email: string, pass: string) {
    return await createUserWithEmailAndPassword(this.auth, email, pass);
  }

  // Login / Registo com o Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  // Logout
  async logout() {
    return await signOut(this.auth);
  }

  // 👇 Método novo: Retorna o utilizador atual autenticado
  getCurrentUser() {
    return this.auth.currentUser;
  }
}
