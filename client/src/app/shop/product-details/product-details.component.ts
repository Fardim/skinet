import { IProduct } from './../../shared/models/product';

import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
	product: IProduct = null;
	constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.loadProduct();
	}

	loadProduct() {
		let id = this.activatedRoute.snapshot.paramMap.get('id');
		this.shopService.getProduct(+id).subscribe(
			(resp) => {
				this.product = resp;
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
