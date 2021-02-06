import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MissionsComponent } from './missions/missions.component';
import { FiltersComponent } from './filters/filters.component';
import { MissionComponent } from './core/mission/mission.component';
import { FilterComponent } from './core/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { ToastrComponent } from './ui/toastr/toastr.component';

@NgModule({
  declarations: [
    AppComponent,
    MissionsComponent,
    FiltersComponent,
    MissionComponent,
    FilterComponent,
    SpinnerComponent,
    ToastrComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
