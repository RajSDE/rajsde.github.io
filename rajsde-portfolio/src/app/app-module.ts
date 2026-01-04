import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Services } from './components/services/services';
import { Experience } from './components/experience/experience';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@NgModule({
  declarations: [
    App,
    Navbar,
    Hero,
    Services,
    Experience,
    Contact,
    Footer
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
