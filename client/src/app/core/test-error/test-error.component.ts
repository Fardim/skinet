import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-test-error',
	templateUrl: './test-error.component.html',
	styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent implements OnInit {
	baseUrl = environment.apiUrl;
	validationErrors: any;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

	get404Error() {
		this.http.get(this.baseUrl + 'products/42').subscribe(
			(resp) => {
				console.log(resp);
			},
			(err) => {
				console.log(err);
			}
		);
	}
	get500Error() {
		this.http.get(this.baseUrl + 'buggy/servererror').subscribe(
			(resp) => {
				console.log(resp);
			},
			(err) => {
				console.log(err);
			}
		);
	}
	get400Error() {
		this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(
			(resp) => {
				console.log(resp);
			},
			(err) => {
				console.log(err);
			}
		);
	}
	get400ValidationError() {
		this.http.get(this.baseUrl + 'products/five').subscribe(
			(resp) => {
				console.log(resp);
			},
			(err) => {
				console.log(err);
				this.validationErrors = err.errors;
			}
		);
	}
}
