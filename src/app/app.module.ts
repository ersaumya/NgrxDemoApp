import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./common/components/navbar/navbar.component";
import { HomeComponent } from "./common/components/home/home.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent],
  imports: [
    BrowserModule, 
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
     AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
