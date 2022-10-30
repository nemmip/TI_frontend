import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { JoinBySessionComponent } from './login/join-by-session/join-by-session.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { GraphQLModule } from '../gql/graphql.module'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RegisterComponent } from './register/register.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { CookieService } from 'ngx-cookie-service'
import { SavedContactsComponent } from './saved-contacts/saved-contacts.component'
import { UserGroupsComponent } from './user-groups/user-groups.component'
import { GroupDashboardComponent } from './group-dashboard/group-dashboard.component'
import { GroupChartComponent } from './group-dashboard/group-chart/group-chart.component'
import { GroupInvitationComponent } from './group-dashboard/group-invitation/group-invitation.component'
import { GroupSummaryComponent } from './group-dashboard/group-summary/group-summary.component'
import { UserGroupBillsComponent } from './group-dashboard/user-group-bills/user-group-bills.component'
import { LogoutComponent } from './logout/logout.component'

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		JoinBySessionComponent,
		RegisterComponent,
		DashboardComponent,
		SavedContactsComponent,
		UserGroupsComponent,
		GroupDashboardComponent,
		GroupSummaryComponent,
		GroupInvitationComponent,
		GroupChartComponent,
		UserGroupBillsComponent,
		LogoutComponent,
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
