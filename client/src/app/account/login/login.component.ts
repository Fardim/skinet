import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	returnUrl: string;
	constructor(
		private fb: FormBuilder,
		private accountService: AccountService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
		this.createLoginForm();
	}

	createLoginForm() {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
			password: [
				'',
				[
					Validators.required,
					Validators.pattern(
						"(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?//&gt;.&lt;,])(?!.*\\s).*$"
					),
				],
			],
		});
	}

	onSubmit() {
		this.accountService.login(this.loginForm.value).subscribe(
			() => {
				this.router.navigateByUrl(this.returnUrl);
				console.log(this.loginForm.value);
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
