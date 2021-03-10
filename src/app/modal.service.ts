import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modals: any[] = [];
  constructor() { }

  add(modal: any) {
    this._modals.push(modal);
  }

  remove(id: string) {
    this._modals = this._modals.filter(x => x.id != id);
  }

  open(id: string) {
    const modal = this._modals.find(x => x.id === id);
    modal.open();
  }

  close(id: string) {
    const modal = this._modals.find(x => x.id === id);
    modal.close();
  }

}
