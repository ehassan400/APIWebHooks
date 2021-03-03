import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubscriberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotifierModule.withConfig({position: {
 
      horizontal: {
     
        /**
         * Defines the horizontal position on the screen
         * @type {'left' | 'middle' | 'right'}
         */
        position: 'right',
     
        /**
         * Defines the horizontal distance to the screen edge (in px)
         * @type {number} 
         */
        distance: 12
     
      },
     
      vertical: {
     
        /**
         * Defines the vertical position on the screen
         * @type {'top' | 'bottom'}
         */
        position: 'top',
     
        /**
         * Defines the vertical distance to the screen edge (in px)
         * @type {number} 
         */
        distance: 25
     
      }
     
    }})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
