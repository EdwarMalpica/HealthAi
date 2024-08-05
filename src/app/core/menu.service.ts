import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  active: { [key: string]: boolean } = {
    home: true,
    form: false,
    about_us: false,
    blog: false,
  };


  setActive(item: string) {
    Object.keys(this.active).forEach((key) => {
      this.active[key] = false;
    });
    this.active[item] = true;
  }

  getActive() {
    return this.active;
  }

  constructor() {
  }
}
