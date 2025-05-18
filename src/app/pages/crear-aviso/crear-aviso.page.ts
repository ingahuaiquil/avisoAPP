import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AvisosService } from '../../components/services/avisos.service'; // 
import { RouterModule } from '@angular/router'; // 

@Component({
  selector: 'app-crear-aviso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule 
  ],
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
})
export class CrearAvisoPage implements OnInit {
  avisoForm!: FormGroup;
  imagenBase64: string | null = null;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private avisosService: AvisosService // Inyecta el servicio
  ) {}

  ngOnInit() {
    this.avisoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      this.imagenBase64 = `data:image/jpeg;base64,${image.base64String}`;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  async guardarAviso() {
    if (this.avisoForm.valid) {
      const aviso = {
        ...this.avisoForm.value,
        fecha: new Date().toISOString(),
        imagen: this.imagenBase64
      };

      await this.avisosService.addAviso(aviso); // Guarda el aviso
      this.navCtrl.navigateBack('/lista-avisos');
    }
  }
}



