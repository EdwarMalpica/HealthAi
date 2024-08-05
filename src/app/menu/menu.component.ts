import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuService } from '../core/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  active: { [key: string]: boolean };
  constructor(private menuService:MenuService, private route: Router) {

  }

  ngOnInit() {
    this.active = this.menuService.getActive();
  }

  setActive(item: string) {
    this.menuService.setActive(item);
    this.active = this.menuService.getActive();
    this.route.navigate(["/"+item]);
  }

}
