import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseURL = 'http://localhost:5008/api/v1/org/1684/contacts';
  contactsList : any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.baseURL+ "/all").subscribe((data : any) => {
      this.contactsList = [];
      data.forEach((element: any) => {
        this.contactsList.push(element);
      });
    })
  }

}
