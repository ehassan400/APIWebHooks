import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseURL = 'http://localhost:8005/webhook';
  contactsList : any = [];
  constructor(private http: HttpClient, private notifierService: NotifierService) { }

  ngOnInit(): void {
  }

  refreshlog(){
    this.http.get(this.baseURL).subscribe((hooks : any) => {
      const countbefore = this.contactsList.length;
      let countafter = 0;

      this.contactsList = [];
      console.log(hooks)

      hooks.forEach((data: any) => {
        if(data.isTriggered)
      {
        if(data.data.action == 'oncreate') data.data.action = 'Create Contact'
        if(data.data.action == 'onupdate') data.data.action = 'Update Contact'
        if(data.data.action == 'ondelete') data.data.action = 'Delete Contact'

        this.contactsList.push(data);
      }
      });
      countafter = this.contactsList.length;
      let addedCount = Math.abs(countbefore - countafter);
      //TODO add any message needed here
      this.notifierService.notify("success", "Log refreshed with "+addedCount+" new logs!");
    })
  }

}
