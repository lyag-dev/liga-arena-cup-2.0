import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons
} from '@ionic/angular';
import { Modalidade } from '../../models/modalidade.model';
import { ModalidadeService } from '../../core/services/services/modalidade.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ModalidadeCardComponent } from '../../components/modalidade-card/modalidade-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonButtons,
    ModalidadeCardComponent
  ],
})
export class HomePage {
  private modalidadeService = inject(ModalidadeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  modalidades: Modalidade[] = [];
  mensagemInscricao = '';
  totalVagas = 0;

  constructor() {
    this.atualizarDados();
  }

  atualizarDados() {
    this.modalidades = this.modalidadeService.getModalidades();
    this.totalVagas = this.modalidadeService.getTotalVagasDisponiveis();
  }

  realizarInscricao(modalidade: Modalidade) {
    const resultado = this.modalidadeService.inscrever(modalidade);
    this.mensagemInscricao = resultado.mensagem;
    this.atualizarDados();
  }

  async sair() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
