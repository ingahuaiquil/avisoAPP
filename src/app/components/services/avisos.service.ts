import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el almacenamiento
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guarda un nuevo aviso
  async addAviso(aviso: any): Promise<void> {
    const avisos = await this.getAvisos();
    avisos.unshift(aviso); // Agrega al inicio
    await this.guardarAvisos(avisos);
  }

  // Obtiene todos los avisos
  async getAvisos(): Promise<any[]> {
    return (await this._storage?.get('avisos')) || [];
  }

  // Elimina un aviso por índice
  async deleteAviso(index: number): Promise<void> {
    const avisos = await this.getAvisos();
    avisos.splice(index, 1);
    await this.guardarAvisos(avisos);
  }

  // Guarda la lista completa de avisos
  private async guardarAvisos(avisos: any[]): Promise<void> {
    await this._storage?.set('avisos', avisos);
  }

  // Limpia todos los avisos
  async clearAvisos(): Promise<void> {
    await this._storage?.remove('avisos');
  }
}

