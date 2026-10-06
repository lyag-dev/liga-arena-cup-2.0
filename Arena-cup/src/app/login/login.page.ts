import { Service } from './../../../node_modules/protobufjs/index.d';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonIcon,
  ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logoGoogle } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

// REGISTRE ASSIM:
addIcons({ logoGoogle });

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonIcon
  ]
})
export class LoginPage {

  private authService = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  logoGoogle = logoGoogle;
  email: string = '';
  senha: string = '';

  async fazerLogin() {
    if (!this.email || !this.senha) {
      this.exibirToast('Preencha todos os campos!');
      return;
    }

    try {
      await this.authService.loginEmail(this.email, this.senha);
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      this.exibirToast('Erro ao entrar: ' + error.message);
    }
  }

  async fazerLoginGoogle() {
    try {
      await this.authService.loginGoogle();
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      this.exibirToast('Erro no login com Google: ' + error.message);
    }
  }

  private async exibirToast(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
