import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular';
import { Modalidade } from '../../models/modalidade.model';

@Component({
  selector: 'app-modalidade-card',
  templateUrl: './modalidade-card.component.html',
  styleUrls: ['./modalidade-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton]
})
export class ModalidadeCardComponent {
  @Input() modalidade!: Modalidade;
  @Output() inscrever = new EventEmitter<Modalidade>();

  onClicarInscrever() {
    this.inscrever.emit(this.modalidade);
  }
}
