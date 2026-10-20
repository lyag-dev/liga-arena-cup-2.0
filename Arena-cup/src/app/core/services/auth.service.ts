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

  // Login com E-mail e Senha
  async login(email: string, pass: string) {
    return await signInWithEmailAndPassword(this.auth, email, pass);
  }

  // Cadastro com E-mail e Senha
  async register(email: string, pass: string) {
    return await createUserWithEmailAndPassword(this.auth, email, pass);
  }

  // Login / Cadastro com Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  // Logout
  async logout() {
    return await signOut(this.auth);
  }
}
