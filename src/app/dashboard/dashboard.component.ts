import { CommonModule } from '@angular/common';
import {
  afterRender,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { ChartModule } from 'primeng/chart';
import { ProcessDataService } from '../core/process-data.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [KnobModule, FormsModule, CommonModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit, OnInit {
  riskHospitalization: any;
  sleepIndex: any;
  fruitsAndVegetablesIndex: any;
  imc: number ;
  dataIMC: any;
  optionsIMC: any;

  centerTitlePlugin = {
    id: 'centerTitlePlugin',
    beforeDraw: (chart: any, args: any, options: any) => {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      const fontSize = (height / 114).toFixed(2);
      ctx.save();
      ctx.font = `sans-serif`;
      ctx.textBaseline = 'middle';

      const text = 'asdasd';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.restore();
    },
  };

  constructor(private cdr: ChangeDetectorRef, private prd: ProcessDataService) {
    this.imc = this.prd.indexCals.IMCIndex;
    this.sleepIndex = this.prd.indexCals.sleepIndex;
    this.fruitsAndVegetablesIndex = this.prd.indexCals.fruitsIndex;
    this.riskHospitalization = this.prd.indexCals.riskOfHospitalizationIndex;
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataIMC = {
      datasets: [
        {
          data: [this.imc, 40 - this.imc],
          backgroundColor: ['#427ba0', '#f0f0f0'],
          hoverBackgroundColor: ['#64B5F6', '#f0f0f0'],
        },
      ],
    };

    this.optionsIMC = {
      cutout: '90%',
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context: any) => {
              if (context.dataIndex === 0) {
                return context.dataset.data[0];
              } else {
                return '';
              }
            },
          },
        },

        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'IMC',
          font: {
            size: 20,
          },
        },
      },
    };
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
    } else if (
      this.riskHospitalization >= 33 &&
      this.riskHospitalization < 70
    ) {
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

  getLabelFruitsAndVegetablesIndex() {
    if (this.fruitsAndVegetablesIndex < 4) {
      return 'You are not eating enough fruits and vegetables';
    } else if (
      this.fruitsAndVegetablesIndex >= 4 &&
      this.fruitsAndVegetablesIndex < 8
    ) {
      return 'You are eating enough fruits and vegetables';
    } else {
      return 'You are eating a lot of fruits and vegetables';
    }
  }

  getValorizationIMC() {
    if (this.imc < 18.5) {
      return 'Underweight';
    } else if (this.imc >= 18.5 && this.imc < 24.9) {
      return 'Normal weight';
    } else if (this.imc >= 25 && this.imc < 29.9) {
      return 'Overweight';
    } else {
      return 'Obesity';
    }
  }


  getRecommendationIMC() {
    if (this.imc < 16) {
      return `
      <div>
        <p>You are severely underweight. This can pose serious health risks, including weakened immune function, fragile bones, and nutrient deficiencies.</p>
        <ul>
          <li><strong>Diet:</strong> Focus on high-calorie, nutrient-dense foods such as nuts, seeds, avocados, lean proteins, and whole grains. Incorporate healthy fats and consider frequent small meals.</li>
          <li><strong>Exercise:</strong> Engage in strength training exercises to build muscle mass. Avoid excessive cardiovascular exercises that could lead to further weight loss.</li>
          <li><strong>Health Check:</strong> It's important to consult with a healthcare provider to rule out underlying conditions and create a tailored plan for weight gain.</li>
        </ul>
      </div>
    `;
    } else if (this.imc >= 16 && this.imc < 17) {
      return `
      <div>
        <p>You are underweight. This can lead to various health issues like a weakened immune system and potential nutrient deficiencies.</p>
        <ul>
          <li><strong>Diet:</strong> Increase your intake of nutritious, high-calorie foods. Include a mix of proteins, carbs, and fats. Foods like nut butters, cheese, whole grain bread, and smoothies can help.</li>
          <li><strong>Exercise:</strong> Incorporate strength training to build muscle mass. Limit intense cardio workouts.</li>
          <li><strong>Health Check:</strong> Consider consulting a nutritionist or healthcare provider for personalized advice.</li>
        </ul>
      </div>
    `;
    } else if (this.imc >= 17 && this.imc < 18.5) {
      return `
      <div>
        <p>You are slightly underweight. It's important to maintain a balanced diet to avoid future health complications.</p>
        <ul>
          <li><strong>Diet:</strong> Eat more frequently, focusing on nutrient-rich foods. Add snacks between meals like nuts, yogurt, and dried fruits.</li>
          <li><strong>Exercise:</strong> Light to moderate strength training can help in gaining muscle mass. Yoga and Pilates are also beneficial.</li>
          <li><strong>Health Check:</strong> Regular check-ups with a healthcare provider can ensure you're on the right track.</li>
        </ul>
      </div>
    `;
    } else if (this.imc >= 18.5 && this.imc < 24.9) {
      return `
      <div>
        <p>You are at a normal weight. This is associated with a lower risk of chronic diseases.</p>
        <ul>
          <li><strong>Diet:</strong> Maintain a balanced diet with a variety of foods including fruits, vegetables, lean proteins, and whole grains.</li>
          <li><strong>Exercise:</strong> Continue regular physical activity such as walking, running, swimming, or cycling for at least 150 minutes a week.</li>
          <li><strong>Health Check:</strong> Regular health check-ups and screenings are important to maintain your current health status.</li>
        </ul>
      </div>
    `;
    } else if (this.imc >= 25 && this.imc < 27) {
      return `
      <div>
        <p>You are slightly overweight. While this may not be immediately concerning, it's a good idea to monitor your lifestyle habits.</p>
        <ul>
          <li><strong>Diet:</strong> Consider portion control and choose lower-calorie options. Focus on fruits, vegetables, lean proteins, and whole grains.</li>
          <li><strong>Exercise:</strong> Increase your physical activity, aiming for at least 150 minutes of moderate-intensity or 75 minutes of high-intensity exercise per week.</li>
          <li><strong>Health Check:</strong> Monitoring your blood pressure, cholesterol, and blood sugar levels can help prevent potential health issues.</li>
        </ul>
      </div>
    `;
    } else if (this.imc >= 27 && this.imc < 29.9) {
      return `
      <div>
        <p>You are overweight. This can increase your risk of chronic conditions such as heart disease, diabetes, and high blood pressure.</p>
        <ul>
          <li><strong>Diet:</strong> Adopt a balanced, calorie-controlled diet rich in fruits, vegetables, whole grains, and lean proteins. Reduce intake of sugary and high-fat foods.</li>
          <li><strong>Exercise:</strong> Engage in regular physical activity, including both aerobic exercises (like walking, swimming, cycling) and strength training.</li>
          <li><strong>Health Check:</strong> Regular monitoring and consultations with a healthcare provider can help manage and reduce potential health risks.</li>
        </ul>
      </div>
    `;
    } else if (this.imc >= 30 && this.imc < 35) {
      return `
      <div>
        <p>You are obese (Class I). This significantly increases your risk for serious health conditions, including heart disease, type 2 diabetes, and certain cancers.</p>
        <ul>
          <li><strong>Diet:</strong> Focus on a nutrient-dense, balanced diet. Consider consulting a dietitian for a personalized meal plan. Reduce your intake of processed foods, sugars, and saturated fats.</li>
          <li><strong>Exercise:</strong> Aim for at least 150 minutes of moderate-intensity exercise per week. Include strength training exercises to build muscle and boost metabolism.</li>
          <li><strong>Health Check:</strong> Seek regular medical advice to manage and mitigate health risks. Consider a comprehensive weight management program.</li>
        </ul>
      </div>
    `;
    } else if (this.imc >= 35 && this.imc < 40) {
      return `
      <div>
        <p>You are severely obese (Class II). This greatly increases your risk of severe health issues, including cardiovascular disease, type 2 diabetes, and sleep apnea.</p>
        <ul>
          <li><strong>Diet:</strong> Implement a structured, low-calorie diet plan. Focus on whole foods and consider professional guidance from a dietitian or nutritionist.</li>
          <li><strong>Exercise:</strong> Engage in low-impact aerobic activities such as walking, swimming, or using an elliptical machine. Gradually increase intensity as tolerated.</li>
          <li><strong>Health Check:</strong> Regular consultations with healthcare providers are essential. Consider discussing weight loss medications or surgical options if lifestyle changes are insufficient.</li>
        </ul>
      </div>
    `;
    } else {
      return `
      <div>
        <p>You are very severely obese (Class III). This poses extreme health risks and requires immediate attention.</p>
        <ul>
          <li><strong>Diet:</strong> A medically supervised diet plan is crucial. Focus on reducing calorie intake and ensuring nutritional balance.</li>
          <li><strong>Exercise:</strong> Start with low-impact, supervised physical activities. Physical therapy may be beneficial to help you get started safely.</li>
          <li><strong>Health Check:</strong> Frequent medical evaluations are necessary. Discuss with your healthcare provider the possibility of bariatric surgery and other intensive weight loss interventions.</li>
        </ul>
      </div>
    `;
    }
  }

  //recharge the data of the chart
  refreshDataIMC() {
    this.dataIMC = {
      datasets: [
        {
          data: [this.imc, 40 - this.imc],
          backgroundColor: ['#427ba0', '#f0f0f0'],
          hoverBackgroundColor: ['#64B5F6', '#f0f0f0'],
        },
      ],
    };
    this.cdr.detectChanges();
  }
}
