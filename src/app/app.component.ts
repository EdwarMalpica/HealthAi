import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";
import { LoaderComponent } from "./loader/loader.component";
import { ProcessDataService } from './core/process-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'HealthAi';

  isLoaderVisible = false;


  constructor(private prd:ProcessDataService) {
  }
  ngOnInit(): void {
    this.prd.isLoading.asObservable().subscribe((value) => {
      this.isLoaderVisible = value;
    }
    );
  }
}
