import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent {
    constructor(private store: Store<fromApp.AppState>) { }

    onSignin(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.store.dispatch(new AuthActions.TrySignin({ username: email, password: password }));
    }

}