import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {
  actionValue="oncreate";
  listenerURL="";
  baseURL = 'http://localhost:5008/api/v1/org/1684/contacts/webhook';
  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  subscribe(){
    this.http.post(this.baseURL, {'action':this.actionValue, 'listener_url':this.listenerURL}).subscribe((data : any) => {
      console.log(data);
    })
  }

  updateaction(event: any) {
    this.actionValue = event.target.value;
  }

  updateurl(event: any) {
    this.listenerURL = event.target.value;
  }
}
