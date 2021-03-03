import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseURL = 'http://localhost:5008/api/v1/org/1684/contacts';
  contactsList : any = [];
  newContactEmail = "";
  newContactName = "";
  isCreateContact=false;
  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.http.get(this.baseURL+ "/all").subscribe((data : any) => {
      this.contactsList = [];
      data.forEach((element: any) => {
        this.contactsList.push(element);
      });
    })

  }

  createCont() {
    this.isCreateContact = true;
  }

  saveContactCreate() {
    this.isCreateContact = false;
    this.http.post(this.baseURL, {'name':this.newContactName, 'email':this.newContactEmail}).subscribe((data : any) => {
      console.log(data);
      this.contactsList = [];
      data.forEach((element: any) => {
        this.contactsList.push(element);
      });
      this.notifierService.notify("success", "Contact Created!");
    })
  }

  newContactNameUpdate(value: any) {
    this.newContactName = value.target.value;
  }

  newContactemailUpdate(value:any){
    this.newContactEmail = value.target.value;
  }

  changeContactName(value: any, contact:any) {
    contact.editName = value.target.value;
  }

  deleteContact(contact: any) {
    this.http.post(this.baseURL+"/delete", contact).subscribe((data : any) => {
      console.log(data);
      this.contactsList = [];
      data.forEach((element: any) => {
        this.contactsList.push(element);
      });
      this.notifierService.notify("success", "Contact Deleted!");
    })
  }

  updateContact(contact: any) {
    contact.isEdit = true;
    contact.editName=contact.name
    this.cd.markForCheck();
  }

  saveContact(event: any, contact:any) {
    contact.name=contact.editName
    contact.isEdit = false;
    this.http.patch(this.baseURL, contact).subscribe((data : any) => {
      console.log(data);
      this.contactsList = [];
      data.forEach((element: any) => {
        this.contactsList.push(element);
      });
      this.notifierService.notify("success", "Contact Updated!");
    })
  }

}
