import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {
  actionValue="oncreate";
  listenerURL="";
  baseURL = 'http://localhost:5008/api/v1/org/1684/contacts/webhook';
  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private notifierService: NotifierService) { }

  ngOnInit(): void {
  }

  subscribe(){
    this.http.post(this.baseURL, {'action':this.actionValue, 'listener_url':this.listenerURL}).subscribe((data : any) => {
      console.log(data);
      if(this.actionValue == 'oncreate')
      this.notifierService.notify("success", "Subscribed to Create action!");
      if(this.actionValue == 'onupdate')
      this.notifierService.notify("success", "Subscribed to update action!");
      if(this.actionValue == 'ondelete')
      this.notifierService.notify("success", "Subscribed to delete action!");
    })
  }

  updateaction(event: any) {
    this.actionValue = event.target.value;
  }

  updateurl(event: any) {
    this.listenerURL = event.target.value;
  }
}
