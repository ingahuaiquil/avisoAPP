import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmacion-eliminacion',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './confirmacion-eliminacion.component.html',
})

/*
- Elimina el aviso y actualiza la lista si el usuario confirma.
- Cierra sin hacer nada si el usuario cancela. 
*/

export class ConfirmacionEliminacionComponent {
  constructor(private modalCtrl: ModalController) {}

  confirmar() {
    this.modalCtrl.dismiss(true); 
    // Devuelve true si se confirma
  }

  cancelar() {
    this.modalCtrl.dismiss(false); 
    // Devuelve false si se cancela
  }
}



