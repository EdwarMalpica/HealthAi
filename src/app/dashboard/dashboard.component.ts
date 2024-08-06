import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [KnobModule, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit {
  riskHospitalization = 0;
  sleepIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {
    this.riskHospitalization = Math.floor(Math.random() * 100);
  }

  ngAfterViewInit(): void {
    if (this.riskHospitalization < 33) {
      this.riskLabelColor.low = true;
    } else if (
      this.riskHospitalization >= 33 &&
      this.riskHospitalization < 70
    ) {
      this.riskLabelColor.moderate = true;
    } else {
      this.riskLabelColor.high = true;
    }
    this.cdr.detectChanges();

  }

  riskLabelColor = {
    low: false,
    moderate: false,
    high: false,
  };

  getLabelRiskHospitalization() {
    if (this.riskHospitalization < 33) {
      return 'You are at low risk of hospitalization';
    } else if (this.riskHospitalization >= 33 && this.riskHospitalization < 70) {
      return 'You are at moderate risk of hospitalization';
    } else {
      return 'You are at high risk of hospitalization';
    }
  }
  //max value is 12, 1 means you are not sleeping well, 12 means you are sleeping well
  getLabelSleepIndex() {
    if (this.sleepIndex < 4) {
      return 'You are not sleeping well';
    } else if (this.sleepIndex >= 4 && this.sleepIndex < 8) {
      return 'You are sleeping well';
    } else {
      return 'You are sleeping very well';
    }

  }


}


