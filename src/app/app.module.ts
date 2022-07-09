import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/pages/public/main/main.component';
import { PresentationComponent } from './components/organisms/presentation/presentation.component';
import { QuoteComponent } from './components/organisms/quote/quote.component';
import { TreeComponent } from './components/molecules/tree/tree.component';
import { SplashComponent } from './components/pages/public/splash/splash.component';
import { ProjectsComponent } from './components/organisms/projects/projects.component';
import { HighlightedTitleComponent } from './components/molecules/highlighted-title/highlighted-title.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PresentationComponent,
    QuoteComponent,
    TreeComponent,
    SplashComponent,
    ProjectsComponent,
    HighlightedTitleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
