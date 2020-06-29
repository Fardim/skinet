import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { timer, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	registerFrom: FormGroup;
	errors: string[];
	constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {}

	ngOnInit(): void {
		this.createRegisterForm();
	}

	createRegisterForm() {
		this.registerFrom = this.fb.group({
			displayName: [null, [Validators.required]],
			email: [
				null,
				[Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
				[this.validateEmailNotTaken()],
			],
			password: [
				null,
				[
					Validators.required,
					Validators.pattern(
						"(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?//&gt;.&lt;,])(?!.*\\s).*$"
					),
				],
			],
		});
	}

	validateEmailNotTaken(): AsyncValidatorFn {
		return (control: AbstractControl) => {
			return timer(500).pipe(
				switchMap(() => {
					if (!control.value) {
						return of(null);
					}
					return this.accountService.checkEmailExist(control.value).pipe(
						map((res) => {
							return res ? { emailExists: true } : null;
						})
					);
				})
			);
		};
	}

	onSubmit() {
		console.log(this.registerFrom.value);
		this.accountService.register(this.registerFrom.value).subscribe(
			(response) => {
				this.router.navigateByUrl('/shop');
			},
			(err) => {
				console.log(err);
				this.errors = err.errors;
			}
		);
	}
}
