import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterStateSerializer
} from "@ngrx/router-store";

import { CustomSerializer } from "./shared/utility";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./common/components/navbar/navbar.component";
import { HomeComponent } from "./common/components/home/home.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      router: routerReducer
    }),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
