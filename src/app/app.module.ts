import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { JoinBySessionComponent } from './login/join-by-session/join-by-session.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GraphQLModule } from '../gql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { SavedContactsComponent } from './saved-contacts/saved-contacts.component';
import { PartyComponent } from './party/party.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UsersBillsComponent } from './users-bills/users-bills.component';
import { GroupDashboardComponent } from './group-dashboard/group-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoinBySessionComponent,
    RegisterComponent,
    DashboardComponent,
    SavedContactsComponent,
    PartyComponent,
    UserGroupsComponent,
    UsersBillsComponent,
    GroupDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
