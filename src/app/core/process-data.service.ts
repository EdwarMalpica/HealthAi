import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


interface DataFormRiskOfHospitalization {
  raevbrn:any,
  codent01:any,
  r5slfmem:any,
  r5pstmem:any,
  r5hibpe:any,
  r5stroke:any,
  r5hipriv:any,
  r5decsib:any,
  r5livsib:any,
  r5wakent:any,
  r5dy:any,
  r5drinkn:any,
  r5toilta:any,
  r5flusht:any,
  r5lift:any,
  r5nopencil:any,
  r5walk1:any,
  r5oopden1y:any,
  r5ipubo:any,
  r5doctim1y:any,
  r5oopmdf1y:any,
  r5isret:any,
  r5ipena:any,
  hh2ctot1m:any,
  hh4ctot1m:any,
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

  constructor(
    private http: HttpClient,
  ) {}

  formatData(formPersonalData: any, formWeightAndHabits: any, formRiskOfHospitalization: any) {
    this.dataFormRiskOfHospitalization.raevbrn = this.getYearOfBirth(
      formPersonalData.birthDate
    );
     this.dataFormRiskOfHospitalization.codent01 = "1.Selected person";
    this.dataFormRiskOfHospitalization.r5slfmem =
      formRiskOfHospitalization.memory;
    this.dataFormRiskOfHospitalization.r5pstmem =
      formRiskOfHospitalization.memoryTwoYearsAgo;
    this.dataFormRiskOfHospitalization.r5hibpe =
      formRiskOfHospitalization.highBloodPressure;
    this.dataFormRiskOfHospitalization.r5stroke =
      formRiskOfHospitalization.stroke;
    this.dataFormRiskOfHospitalization.r5hipriv =
      formWeightAndHabits.privateHealthInsurance;
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
    this.dataFormRiskOfHospitalization.r5isret = formRiskOfHospitalization.retired;
    this.dataFormRiskOfHospitalization.r5ipena = formRiskOfHospitalization.pension;
    this.dataFormRiskOfHospitalization.hh2ctot1m =
      formRiskOfHospitalization.householdExpenditure;
    this.dataFormRiskOfHospitalization.hh4ctot1m =
      formRiskOfHospitalization.householdExpenditure;
    this.postData(this.dataFormRiskOfHospitalization);
  }


  getAge(date:Date){
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getYearOfBirth(date:Date){
    const birthDate = new Date(date);
    return birthDate.getFullYear();
  }

  postData(data: any) {
    return this.http.post(`${this.apiUrl}/`, data).subscribe(
    {
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    }
    );
  }

}
