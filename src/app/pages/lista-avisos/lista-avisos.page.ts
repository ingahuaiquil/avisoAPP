import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { AvisosService } from '../../components/services/avisos.service';
import { ConfirmacionEliminacionComponent } from '../../components/modals/confirmacion-eliminacion/confirmacion-eliminacion.component';

@Component({
  selector: 'app-lista-avisos',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './lista-avisos.page.html',
  styleUrls: ['./lista-avisos.page.scss'],
})

/*
- Usa correctamente el servicio AvisosService.
- Muestra los avisos al cargar la página.
- Abre un modal de confirmación antes de eliminar.
- Actualiza la lista después de eliminar un aviso.
*/

export class ListaAvisosPage implements OnInit {
  avisos: any[] = [];

  constructor(
    private avisosService: AvisosService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.avisos = await this.avisosService.getAvisos();
  }

  async eliminarAviso(index: number) {
    const modal = await this.modalCtrl.create({
      component: ConfirmacionEliminacionComponent,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data === true) {
      await this.avisosService.deleteAviso(index);
      this.avisos = await this.avisosService.getAvisos(); // actualiza la lista
    }
  }
}


