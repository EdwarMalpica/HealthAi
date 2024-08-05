import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProcessDataService {
  formWeightAndHabits = {
    weight: '',
    height: '',
    smoke: '',
    alcohol: '',
    daysOfExercise: '',
    frequencyOfIssuesWithSleep: '',
  };

  constructor() {}
}
