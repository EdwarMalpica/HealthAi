import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer } from 'rxjs';
import { Router } from '@angular/router';

interface DataFormRiskOfHospitalization {
  raevbrn: any;
  codent01: any;
  r5slfmem: any;
  r5pstmem: any;
  r5hibpe: any;
  r5stroke: any;
  r5hipriv: any;
  r5decsib: any;
  r5livsib: any;
  r5wakent: any;
  r5dy: any;
  r5drinkn: any;
  r5toilta: any;
  r5flusht: any;
  r5lift: any;
  r5nopencil: any;
  r5walk1: any;
  r5oopden1y: any;
  r5ipubo: any;
  r5doctim1y: any;
  r5oopmdf1y: any;
  r5isret: any;
  r5ipena: any;
  hh2ctot1m: any;
  hh4ctot1m: any;
}

interface DataFormWeightAndHabits {
  weight: any;
  unitsWeight: any;
  height: any;
  unitsHeight: any;
  daysOfExercise: any;
  minutesOfExercise: any;
  hoursOfSleep: any;
  frequencyOfIssuesForSleep: any;
  manyFruits: any;
  manyVegetables: any;
  smoker: any;
  drinker: any;
}

interface DataFormPersonalData {
  name: any;
  lastName: any;
  birthDate: any;
  gender: any;
}

// index of sleep, index of IMC. index of vegetables and fruits
interface indexCalculation {
  riskOfHospitalizationIndex: number;
  sleepIndex: number;
  IMCIndex: number;
  fruitsIndex: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProcessDataService {
  apiUrl = environment.API_URL;

  /*
raevbrn
codent01
r5slfmem
r5pstmem
r5hibpe
r5stroke
r5hipriv
r5decsib
r5livsib
r5wakent
r5dy
r5drinkn
r5toilta
r5flusht
r5lift
r5nopencil
r5walk1
r5oopden1y
r5ipubo
r5doctim1y
r5oopmdf1y
r5isret
r5ipena
hh2ctot1m
hh4ctot1m
*/
  dataFormRiskOfHospitalization: DataFormRiskOfHospitalization = {
    raevbrn: '',
    codent01: '',
    r5slfmem: '',
    r5pstmem: '',
    r5hibpe: '',
    r5stroke: '',
    r5hipriv: '',
    r5decsib: '',
    r5livsib: '',
    r5wakent: '',
    r5dy: '',
    r5drinkn: '',
    r5toilta: '',
    r5flusht: '',
    r5lift: '',
    r5nopencil: '',
    r5walk1: '',
    r5oopden1y: '',
    r5ipubo: '',
    r5doctim1y: '',
    r5oopmdf1y: '',
    r5isret: '',
    r5ipena: '',
    hh2ctot1m: '',
    hh4ctot1m: '',
  };

  dataFormWeightAndHabits: DataFormWeightAndHabits = {
    weight: '',
    unitsWeight: '',
    height: '',
    unitsHeight: '',
    daysOfExercise: '',
    minutesOfExercise: '',
    hoursOfSleep: '',
    frequencyOfIssuesForSleep: '',
    manyFruits: '',
    manyVegetables: '',
    smoker: '',
    drinker: '',
  };

  dataFormPersonalData: DataFormPersonalData = {
    name: '',
    lastName: '',
    birthDate: '',
    gender: '',
  };

  indexCalculation: Subject<indexCalculation>;

  indexCals:indexCalculation = {
    riskOfHospitalizationIndex: 0,
    sleepIndex: 0,
    IMCIndex: 0,
    fruitsIndex: 0,
  };

  isLoading: Subject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.indexCalculation = new Subject<indexCalculation>();
    this.isLoading = new Subject<boolean>();
  }

  formatData(
    formPersonalData: any,
    formWeightAndHabits: any,
    formRiskOfHospitalization: any
  ) {
    this.dataFormRiskOfHospitalization.raevbrn = this.getYearOfBirth(
      formPersonalData.birthDate
    );
    this.dataFormRiskOfHospitalization.codent01 = '1.Selected person';
    this.dataFormRiskOfHospitalization.r5slfmem =
      formRiskOfHospitalization.memory;
    this.dataFormRiskOfHospitalization.r5pstmem =
      formRiskOfHospitalization.memoryTwoYearsAgo;
    this.dataFormRiskOfHospitalization.r5hibpe =
      formRiskOfHospitalization.highBloodPressure;
    this.dataFormRiskOfHospitalization.r5stroke =
      formRiskOfHospitalization.stroke;
    this.dataFormRiskOfHospitalization.r5hipriv =
      formRiskOfHospitalization.privateHealthInsurance;
    this.dataFormRiskOfHospitalization.r5decsib =
      formRiskOfHospitalization.siblingsDied;
    this.dataFormRiskOfHospitalization.r5livsib =
      formRiskOfHospitalization.siblingsAlive;
    this.dataFormRiskOfHospitalization.r5wakent =
      formRiskOfHospitalization.wakeUpAtNight;
    this.dataFormRiskOfHospitalization.r5dy = '1.Correct';
    this.dataFormRiskOfHospitalization.r5drinkn =
      formRiskOfHospitalization.alcoholicDrinks;
    this.dataFormRiskOfHospitalization.r5toilta =
      formRiskOfHospitalization.difficultyUsingTheToilet;
    this.dataFormRiskOfHospitalization.r5flusht =
      formRiskOfHospitalization.accessToFlushToilet;
    this.dataFormRiskOfHospitalization.r5lift =
      formRiskOfHospitalization.difficultyLiftingHeavyObjects;
    this.dataFormRiskOfHospitalization.r5nopencil =
      formRiskOfHospitalization.difficultyUsingPencilOrPen;
    this.dataFormRiskOfHospitalization.r5walk1 =
      formRiskOfHospitalization.walkOneKm;
    this.dataFormRiskOfHospitalization.r5oopden1y =
      formRiskOfHospitalization.dentistVisits;
    this.dataFormRiskOfHospitalization.r5ipubo =
      formRiskOfHospitalization.hospitalVisits;
    this.dataFormRiskOfHospitalization.r5doctim1y =
      formRiskOfHospitalization.doctorVisits;
    this.dataFormRiskOfHospitalization.r5oopmdf1y =
      formRiskOfHospitalization.medications;
    this.dataFormRiskOfHospitalization.r5isret =
      formRiskOfHospitalization.retired;
    this.dataFormRiskOfHospitalization.r5ipena =
      formRiskOfHospitalization.pension;
    this.dataFormRiskOfHospitalization.hh2ctot1m =
      formRiskOfHospitalization.householdExpenditure;
    this.dataFormRiskOfHospitalization.hh4ctot1m =
      formRiskOfHospitalization.householdExpenditure;

    this.dataFormWeightAndHabits.weight = formWeightAndHabits.weight;
    this.dataFormWeightAndHabits.unitsWeight = formWeightAndHabits.unitsWeight;
    this.dataFormWeightAndHabits.height = formWeightAndHabits.height;
    this.dataFormWeightAndHabits.unitsHeight = formWeightAndHabits.unitsHeight;
    this.dataFormWeightAndHabits.daysOfExercise =
      formWeightAndHabits.daysOfExercise;
    this.dataFormWeightAndHabits.minutesOfExercise =
      formWeightAndHabits.minutesOfExercise;
    this.dataFormWeightAndHabits.hoursOfSleep =
      formWeightAndHabits.hoursOfSleep;
    this.dataFormWeightAndHabits.frequencyOfIssuesForSleep =
      formWeightAndHabits.frequencyOfIssuesForSleep;
    this.dataFormWeightAndHabits.manyFruits = formWeightAndHabits.manyFruits;
    this.dataFormWeightAndHabits.manyVegetables =
      formWeightAndHabits.manyVegetables;
    this.dataFormWeightAndHabits.smoker = formWeightAndHabits.smoker;
    this.dataFormWeightAndHabits.drinker = formWeightAndHabits.drinker;

    this.dataFormPersonalData.name = formPersonalData.name;
    this.dataFormPersonalData.lastName = formPersonalData.lastName;
    this.dataFormPersonalData.birthDate = formPersonalData.birthDate;
    this.dataFormPersonalData.gender = formPersonalData.gender;

    this.processAndCalculateData();
    this.postData(this.dataFormRiskOfHospitalization);

    timer(10000).subscribe(() => {
       this.changeLoadingStatus(false);
     });
  }

  getAge(date: Date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getYearOfBirth(date: Date) {
    const birthDate = new Date(date);
    return birthDate.getFullYear();
  }

  postData(data: any) {
    return this.http.post(`${this.apiUrl}/`, data).subscribe({
      next: (data:any) => {
        this.indexCals.riskOfHospitalizationIndex = data.Result;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  processAndCalculateData() {
    //check units of weight and height
    let weight = this.dataFormWeightAndHabits.weight;
    let height = this.dataFormWeightAndHabits.height;
    weight = this.convertWeightToKg(
      weight,
      this.dataFormWeightAndHabits.unitsWeight
    );
    height = this.convertHeightToM(
      height,
      this.dataFormWeightAndHabits.unitsHeight
    );

    //calculate IMC
    const IMC = this.calculateBMC(weight, height);

    //calculate sleep index
    const sleepIndex = this.calculateSleepIndex(
      this.dataFormWeightAndHabits.hoursOfSleep,
      this.dataFormWeightAndHabits.frequencyOfIssuesForSleep
    );

    //calculate index of vegetables and fruits
    const fruitsIndex = this.calculateFruitsAndVegetablesIndex(
      this.dataFormWeightAndHabits.manyFruits,
      this.dataFormWeightAndHabits.manyVegetables
    );


    this.indexCalculation.next({
      riskOfHospitalizationIndex: 0,
      sleepIndex: sleepIndex,
      IMCIndex: IMC,
      fruitsIndex: fruitsIndex,
    });

    this.indexCals = {
      riskOfHospitalizationIndex: 0,
      sleepIndex: sleepIndex,
      IMCIndex: Math.round(IMC),
      fruitsIndex: fruitsIndex,
    };
    this.gotoDashboard();
  }

  convertWeightToKg(weight: number, units: string) {
    if (units === 'lb') {
      return weight / 2.20462;
    }
    return weight;
  }

  convertHeightToM(height: number, units: string) {
    if (units === 'in') {
      return height / 39.3701;
    }
    return height / 100;
  }

  calculateBMC(weight: number, height: number) {
    return weight / (height * height);
  }

  calculateSleepIndex(hoursOfSleep: number, frequencyOfIssuesForSleep: number) {
    if (hoursOfSleep >= 8 && frequencyOfIssuesForSleep === 0) {
      return 12;
    }
    if (hoursOfSleep >= 6 && frequencyOfIssuesForSleep === 1) {
      return 8;
    }
    if (hoursOfSleep >= 6 && frequencyOfIssuesForSleep === 2) {
      return 6;
    }
    if (hoursOfSleep >= 6 && frequencyOfIssuesForSleep === 3) {
      return 4;
    }
    if (hoursOfSleep < 6 && frequencyOfIssuesForSleep === 0) {
      return 8;
    }
    if (hoursOfSleep < 6 && frequencyOfIssuesForSleep === 1) {
      return 4;
    }
    if (hoursOfSleep < 6 && frequencyOfIssuesForSleep === 2) {
      return 2;
    }
    if (hoursOfSleep < 6 && frequencyOfIssuesForSleep === 3) {
      return 0;
    }
    return 0;
  }

  calculateFruitsAndVegetablesIndex(
    manyFruits: number,
    manyVegetables: number
  ) {
    if (manyFruits >= 5 && manyVegetables >= 5) {
      return 12;
    }
    if (manyFruits >= 3 && manyVegetables >= 3) {
      return 8;
    }
    if (manyFruits >= 1 && manyVegetables >= 1) {
      return 4;
    }
    return 0;
  }

  changeLoadingStatus(status: boolean) {
    this.isLoading.next(status);
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
