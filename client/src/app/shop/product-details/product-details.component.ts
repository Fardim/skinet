import { BasketService } from './../../basket/basket.service';
import { IProduct } from './../../shared/models/product';

import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
	product: IProduct = null;
	quantity: number = 1;
	constructor(
		private shopService: ShopService,
		private activatedRoute: ActivatedRoute,
		private breadcrumbService: BreadcrumbService,
		private basketService: BasketService
	) {
		this.breadcrumbService.set('@productDetails', '');
	}

	ngOnInit(): void {
		this.loadProduct();
	}

	loadProduct() {
		let id = this.activatedRoute.snapshot.paramMap.get('id');
		this.shopService.getProduct(+id).subscribe(
			(resp) => {
				this.product = resp;
				this.breadcrumbService.set('@productDetails', this.product.name);
			},
			(err) => {
				console.log(err);
			}
		);
	}

	addItemToCart() {
		this.basketService.addItemToBasket(this.product, this.quantity);
	}

	incrementQuantity() {
		this.quantity++;
	}
	decrementQuantity() {
		if (this.quantity > 1) {
			this.quantity--;
		}
	}
}
