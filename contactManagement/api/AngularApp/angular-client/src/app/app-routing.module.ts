import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { SubscriberComponent } from './subscriber/subscriber.component';

const routes: Routes = [{path: 'subscribe', component: SubscriberComponent},
{path: 'contacts', component: HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
