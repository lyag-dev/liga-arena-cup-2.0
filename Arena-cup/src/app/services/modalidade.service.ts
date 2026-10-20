
import { Injectable } from '@angular/core';
import { Modalidade } from '../../../models/modalidade.model';

@Injectable({
  providedIn: 'root'
})
export class ModalidadeService {
  private modalidades: Modalidade[] = [
    { id: '1', nome: 'FIFA 1x1', vagas: 8, preco: 5, lotado: false },
    { id: '2', nome: 'Valorant interno', vagas: 10, preco: 10, lotado: false },
    { id: '3', nome: 'Xadrez blitz', vagas: 16, preco: 0, lotado: false },
    { id: '4', nome: 'Just Dance', vagas: 6, preco: 5, lotado: false },
    { id: '5', nome: 'Super Smash', vagas: 0, preco: 15, lotado: true }
  ];


  getModalidades(): Modalidade[] {
    return this.modalidades;
  }


  inscrever(modalidade: Modalidade): { sucesso: boolean; mensagem: string } {
    if (modalidade.lotado || modalidade.vagas <= 0) {
      return { sucesso: false, mensagem: 'Esta modalidade está lotada!' };
    }

    modalidade.vagas--;

    if (modalidade.vagas === 0) {
      modalidade.lotado = true;
    }

    return { sucesso: true, mensagem: 'inscrição salva' };
  }

  getTotalVagasDisponiveis(): number {
    return this.modalidades.reduce((total, m) => total + m.vagas, 0);
  }

  getModalidadesDisponiveis(): Modalidade[] {
    return this.modalidades.filter(m => !m.lotado);
  }
}
