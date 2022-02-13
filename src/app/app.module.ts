import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/pages/public/main/main.component';
import { PresentationComponent } from './components/organisms/presentation/presentation.component';
import { QuoteComponent } from './components/organisms/quote/quote.component';
import { TreeComponent } from './components/molecules/tree/tree.component';
import { SplashComponent } from './components/pages/public/splash/splash.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PresentationComponent,
    QuoteComponent,
    TreeComponent,
    SplashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
