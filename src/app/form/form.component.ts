import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SelectButtonModule } from 'primeng/selectbutton';
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

  optionsPrivateHealthInsurance = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  optionsVisitedTheDoctorInLastYear = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];
  optionsWakeUpDuringTheNight = [
    { name: 'Never', value: 'Never' },
    { name: 'Rarely', value: 'Rarely' },
    { name: 'Sometimes', value: 'Sometimes' },
    { name: 'Always', value: 'Always' },
  ];

  optionsStroke = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];
  /*1.Almost every day
2.4 or more times a week
3.2 or 3 times a week
4.Once a week
5.4 or more times a month
6.2 or 3 times a month
7.Once a month
8.Almost Never, sporadic
9.Never*/

  optionsCareForSickOrDisabledAdult = [
    { name: 'Almost every day', value: 'Almost every day' },
    { name: '4 or more times a week', value: '4 or more times a week' },
    { name: '2 or 3 times a week', value: '2 or 3 times a week' },
    { name: 'Once a week', value: 'Once a week' },
    { name: '4 or more times a month', value: '4 or more times a month' },
    { name: '2 or 3 times a month', value: '2 or 3 times a month' },
    { name: 'Once a month', value: 'Once a month' },
    { name: 'Almost Never, sporadic', value: 'Almost Never, sporadic' },
    { name: 'Never', value: 'Never' },
  ];

  optionsWalking = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];
  optionsGovernmentHealthInsurance = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];
  optionsFeelThatEverythingIsAnEffort = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];
  optionsExperienceDifficulty = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  optionsLaborForce = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  optionsDifficultyWalking = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  optionsPolicyholder = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  optionsChangesInFamilyGroup = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  formPersonalData: FormGroup;
  formWeightAndHabits: FormGroup;
  formRiskOfHospitalization: FormGroup;
  isCompletedFormPersonalData: Observable<boolean>;
  isCompletedFormWeightAndHabits: Observable<boolean>;
  isCompletedFormRiskOfHospitalization: Observable<boolean>;

  constructor(private formBuilder: FormBuilder) {}
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
      privateHealthInsurance: ['', Validators.required],
      outOfPocketMedicalExpenses: ['', Validators.required],
      visitedTheDoctorInLastYear: ['', Validators.required],
      OftenWakeUpDuringTheNight: ['', Validators.required],
      howManyChildren: ['', Validators.required],
      everExperiencedStroke: ['', Validators.required],
      siblingsHavePassedAway: ['', Validators.required],
      annualIncomeFromPublicRetirement: ['', Validators.required],
      annualIncomeFromPrivateRetirement: ['', Validators.required],
      howManySiblingAreAlive: ['', Validators.required],
      numberOfDoctorsVisitedInLastYear: ['', Validators.required],
      annualIncomeFromPublicPension: ['', Validators.required],
      oftenCareSickDuringTheLastYear: ['', Validators.required],
      youEngageInPhysicalActivity: ['', Validators.required],
      annualIncomeFromPrivatePension: ['', Validators.required],
      howManyWordsCanYouRecall: ['', Validators.required],
      coveredByGovernmentHealthInsurance: ['', Validators.required],
      annualIncomeFromOthersPension: ['', Validators.required],
      oftenFeelThatEverythingIsAnEffort: ['', Validators.required],
      experienceDifficultiesWithAtLeasOneHealthProblem: [
        '',
        Validators.required,
      ],
      currentlyConsideredPartOfTheLaborForce: ['', Validators.required],
      walkingClimbingStairs: ['', Validators.required],
      policyholder: ['', Validators.required],
      changesInTheCompositionOfTheFamily: ['', Validators.required],
    });
    this.formRiskOfHospitalization.valueChanges.subscribe((value) => {
      if (this.formRiskOfHospitalization.valid) {
        this.isCompletedFormRiskOfHospitalization = new Observable<boolean>(
          (observer) => {
            observer.next(true);
          }
        );
      }
    }
    );
  }

  onSubmit() {
    console.log(this.formPersonalData.value);
  }
}
