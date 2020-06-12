import { IProduct } from './models/product';
import { IPagination } from './models/pagination';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'SkiNet';
	products: IProduct[] = [];

	constructor(private http: HttpClient) {}
	ngOnInit(): void {
		this.http.get('https://localhost:5001/api/products?pageSize=50').subscribe(
			(resp: IPagination) => {
				console.log(resp);
				this.products = resp.data;
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
