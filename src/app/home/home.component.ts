import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuService } from '../core/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('bg_img') bg_img!: ElementRef;

  constructor(private menuService:MenuService, private router:Router) {

  }
  ngAfterViewInit(): void {
    const bg_img = this.bg_img.nativeElement as HTMLDivElement;


  }

  ngOnInit() {

  }

  goToForm() {
    this.menuService.setActive('form');
    this.router.navigate(['/form']);
  }

}
