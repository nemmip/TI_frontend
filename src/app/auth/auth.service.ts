import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { REFRESH_USER_SESSION } from 'src/gql/gql.mutations';

const FIFTEEN_MINUTES = 15 * 60 * 1000;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly apollo: Apollo) {}

  isLoggedIn() {
    const token = localStorage.getItem('authorization');
    try {
      const payload = atob(token?.split('.')[1] ?? '');
      console.log(payload, token);
      const parsedPayload = JSON.parse(payload);
      const lessThan15 =
        parsedPayload.exp - new Date().getMilliseconds() <= FIFTEEN_MINUTES;
      if (parsedPayload.exp && lessThan15) {
        this.refreshToken(token ?? '');
      }
      return parsedPayload.exp > Date.now() / 1000;
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  private refreshToken(token: string) {
    this.apollo
      .mutate({
        mutation: REFRESH_USER_SESSION,
        variables: {
          input: token,
        },
      })
      .subscribe(async ({ data }) => {
        const tokenData = data as { createLoginSession: string };
        localStorage.setItem('authorization', tokenData.createLoginSession);
      });
  }
}
