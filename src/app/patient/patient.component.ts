import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Patient } from './patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: any;
  ans: any;
  constructor(private http: HttpClient) { }

  genders = ['Male', 'Female',
    'Other'];

  model = new Patient('ABC', this.genders[2], 'XXXXXXXXXX');
  searchText: String;
  submitted = false;
  all = false;
  isnum = /^\d+$/.test(this.model.phoneNumber);

  onSubmit() {
    this.all = false;
    if (this.model.name.length > 200)
      return alert("Numbename length exceeds");
    if (this.model.phoneNumber.length != 10)
      return alert("Number is incorrect");
    if (!(/^\d+$/.test(this.model.phoneNumber)))
      return alert("Only digits allowed");
    this.submitted = true;

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.model);
    let response = this.http.post<any>("http://localhost:8080/patient", body, { 'headers': headers });
    response.subscribe((data) =>
      this.ans = data);

    this.ngOnInit();
  }

  ngOnInit(): void {
    this.all = false;
    let response = this.http.get("http://localhost:8080/patient");
    response.subscribe((data) =>
      this.patients = data);
    this.model = new Patient('ABC', this.genders[2], 'XXXXXXXXXX');
    console.log(this.patients);
  }

  searchItems(): void {
    let response = this.http.get("http://localhost:8080/patient/" + this.searchText);
    response.subscribe((data) =>
      this.patients = data);
  }

  search(): void {
    let response = this.http.get("http://localhost:8080/patient/" + this.searchText);
    response.subscribe((data) =>
      this.patients = data);
  }

  RowSelected(u: Patient) {
  
    let response = this.http.put("http://localhost:8080/patient/" + u.phoneNumber, u.phoneNumber);
    response.subscribe((data) =>
      this.patients = data);
    this.ngOnInit();
    this.model.name = u.name;
    this.model.gender = u.gender;
    this.model.phoneNumber = u.phoneNumber;
    this.all = true;
  }

  RowSelectedEdit(u: Patient) {
    this.model.name = u.name;
    this.model.gender = u.gender;
    this.model.phoneNumber = u.phoneNumber;
    this.all = true;
  }

}
