import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AuthLoginInput } from 'src/gql/gql.inputs';
import { LOGIN_WITH_EMAIL_MUTATION } from 'src/gql/gql.mutations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials: AuthLoginInput = {
    email: '',
    password: '',
  };
  constructor(private apollo: Apollo) {}

  loginWithEmail() {
    this.apollo
      .mutate({
        mutation: LOGIN_WITH_EMAIL_MUTATION,
        variables: {
          input: this.credentials,
        },
      })
      .subscribe(({ data }) => console.log(data));
  }

  ngOnInit(): void {}
}
