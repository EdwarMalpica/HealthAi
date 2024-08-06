import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProcessDataService } from '../core/process-data.service';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    StepperModule,
    ButtonModule,
    CalendarModule,
    ReactiveFormsModule,
    CommonModule,
    SelectButtonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  styleCalendar = {
    width: '100%',
    height: '28px',
  };

  optionsDaysOfExercise = [
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' },
    { name: '6', value: '6' },
    { name: '7', value: '7' },
  ];
  /*
 1.Most of the time
2.Sometimes
3.Rarely or never

 */
  optionsFrequencyOfIssuesWithSleep = [
    { name: 'Most of the time', value: 'Most of the time' },
    { name: 'Sometimes', value: 'Sometimes' },
    { name: 'Rarely or never', value: 'Rarely or never' },
  ];

  optionsSmoke = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  optionsAlcohol = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];
  //1: Excellent, 2: Very good, 3: Good, 4: Fair, 5: Poor,
  optionsMemory = [
    { name: 'Excellent', value: '1.Excellent' },
    { name: 'Very good', value: '2.Very good' },
    { name: 'Good', value: '3.Good' },
    { name: 'Fair', value: '4.Fair' },
    { name: 'Poor', value: '5.Poor' },
  ];

  optionsMemoryTwoYearsAgo = [
    { name: 'Excellent', value: '1.Excellent' },
    { name: 'Very good', value: '2.Very good' },
    { name: 'Good', value: '3.Good' },
    { name: 'Fair', value: '4.Fair' },
    { name: 'Poor', value: '5.Poor' },
  ];
  optionsHighBloodPressure = [
    { name: 'Yes', value: '1.Yes' },
    { name: 'No', value: '0.No' },
  ];
  optionsStroke = [
    { name: 'Yes', value: '1.Yes' },
    { name: 'No', value: '0.No' },
  ];
  optionsPrivateHealthInsurance = [
    { name: 'Yes', value: '1.Yes' },
    { name: 'No', value: '0.No' },
  ];
  // 1: Never, 2: Sometimes, 3: Frequently, 4: Very frequently
  optionsWakeUpAtNight = [
    { name: 'Never', value: '1.Never' },
    { name: 'Sometimes', value: '2.Sometimes' },
    { name: 'Frequently', value: '3.Frequently' },
    { name: 'Very frequently', value: '4.Very frequently' },
  ];
  optionsDifficultyUsingTheToilet = [
    { name: 'Yes', value: '1.Yes' },
    { name: 'No', value: '0.No' },
  ];
  optionsAccessToFlushToilet = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: '0.No' },
  ];
  optionsDifficultyLiftingHeavyObjects = [
    { name: 'Yes', value: '1.Yes' },
    { name: 'No', value: '0.No' },
  ];
  optionsDifficultyUsingPencilOrPen = [
    { name: 'Yes', value: '1.Yes' },
    { name: 'No', value: '0.No' },
  ];
  optionsWalkOneKm = [
    { name: 'Yes', value: '1.Yes' },
    { name: 'No', value: '0.No' },
  ];
  optionsRetired = [
    { name: 'Yes', value: '1.Yes' },
    { name: 'No', value: '0.No' },
  ];
  optionsPension = [
    { name: 'Yes', value: '1.Yes' },
    { name: 'No', value: '0.No' },
  ];

  formPersonalData: FormGroup;
  formWeightAndHabits: FormGroup;
  formRiskOfHospitalization: FormGroup;
  isCompletedFormPersonalData: Observable<boolean>;
  isCompletedFormWeightAndHabits: Observable<boolean>;
  isCompletedFormRiskOfHospitalization: Observable<boolean>;

  constructor(private formBuilder: FormBuilder,
    private proData:ProcessDataService
  ) {}
  ngOnInit(): void {
    this.isCompletedFormPersonalData = new Observable<boolean>();
    this.isCompletedFormWeightAndHabits = new Observable<boolean>();
    this.isCompletedFormRiskOfHospitalization = new Observable<boolean>();
    this.formPersonalData = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.formPersonalData.valueChanges.subscribe((value) => {
      if (this.formPersonalData.valid) {
        this.isCompletedFormPersonalData = new Observable<boolean>(
          (observer) => {
            observer.next(true);
          }
        );
      }
    });
    this.formWeightAndHabits = this.formBuilder.group({
      weight: ['', Validators.required],
      unitsWeight: ['', Validators.required],
      height: ['', Validators.required],
      unitsHeight: ['', Validators.required],
      daysOfExercise: ['', Validators.required],
      minutesOfExercise: ['', Validators.required],
      hoursOfSleep: ['', Validators.required],
      frequencyOfIssuesForSleep: ['', Validators.required],
      manyFruits: ['', Validators.required],
      manyVegetables: ['', Validators.required],
      smoker: ['', Validators.required],
      drinker: ['', Validators.required],
    });

    this.formWeightAndHabits.valueChanges.subscribe((value) => {
      if (this.formWeightAndHabits.valid) {
        this.isCompletedFormWeightAndHabits = new Observable<boolean>(
          (observer) => {
            observer.next(true);
          }
        );
      }
    });
    this.formRiskOfHospitalization = this.formBuilder.group({
      memory: ['', Validators.required],
      memoryTwoYearsAgo: ['', Validators.required],
      highBloodPressure: ['', Validators.required],
      stroke: ['', Validators.required],
      privateHealthInsurance: ['', Validators.required],
      siblingsDied: ['', Validators.required],
      siblingsAlive: ['', Validators.required],
      wakeUpAtNight: ['', Validators.required],
      alcoholicDrinks: ['', Validators.required],
      difficultyUsingTheToilet: ['', Validators.required],
      accessToFlushToilet: ['', Validators.required],
      difficultyLiftingHeavyObjects: ['', Validators.required],
      difficultyUsingPencilOrPen: ['', Validators.required],
      walkOneKm: ['', Validators.required],
      dentistVisits: ['', Validators.required],
      hospitalVisits: ['', Validators.required],
      doctorVisits: ['', Validators.required],
      medications: ['', Validators.required],
      retired: ['', Validators.required],
      pension: ['', Validators.required],
      householdExpenditure: ['', Validators.required],
    });
    this.formRiskOfHospitalization.valueChanges.subscribe((value) => {
      if (this.formRiskOfHospitalization.valid) {
          console.log('isvalid');
        this.isCompletedFormRiskOfHospitalization = new Observable<boolean>(
          (observer) => {
            observer.next(true);
          }
        );
      }
    });
  }

  onSubmit() {
    this.proData.formatData(this.formPersonalData.value, this.formWeightAndHabits.value, this.formRiskOfHospitalization.value);
  }
}
