import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('bg_img') bg_img!: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    const bg_img = this.bg_img.nativeElement as HTMLDivElement;


  }

  ngOnInit() {
  }



}
