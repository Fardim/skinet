import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagination';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'SkiNet';

	constructor(private http: HttpClient, private basketService: BasketService, private accountService: AccountService) {}
	ngOnInit(): void {
		this.loadBasket();
		this.loadCurrentUser();
	}
	loadCurrentUser() {
		const token = localStorage.getItem('token');
		this.accountService.loadCurrentUser(token).subscribe(
			() => {
				console.log('loaded user');
			},
			(err) => {
				console.log(err);
			}
		);
	}
	loadBasket() {
		const basketId = localStorage.getItem('basket_id');
		if (basketId) {
			this.basketService.getBasket(basketId).subscribe(
				() => {
					console.log('Initialized basket');
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
}
