import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  active = {
    home: true,
    health_tips: false,
    about_us: false,
    blog:false
  };

  constructor() { }

  ngOnInit() {
  }

}
