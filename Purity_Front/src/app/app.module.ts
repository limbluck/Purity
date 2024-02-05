import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './pages/page-components/header/header.component';
import { SidebarComponent } from './pages/page-components/sidebar/sidebar.component';
import { ChatbarComponent } from './pages/page-components/chatbar/chatbar.component';
import { FooterComponent } from './pages/page-components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';

import { DropdownDirective } from './directives/dropdown.directive';
import { SwipeDetectionDirective } from './directives/swipe-detection.directive';
import { CarouselDirective } from './directives/carousel.directive';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    SidebarComponent,
    ChatbarComponent,
    FooterComponent,

    HomeComponent,

    DropdownDirective,
    SwipeDetectionDirective,
    CarouselDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
