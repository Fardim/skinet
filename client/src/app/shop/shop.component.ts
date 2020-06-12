import { ShopParams } from './../shared/models/shopParams';
import { IType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
	@ViewChild('search', { static: true }) searchTerm: ElementRef;
	products: IProduct[] = [];
	brands: IBrand[] = [];
	types: IType[] = [];
	shopParams = new ShopParams();
	sortOptions = [
		{ name: 'Alphabetical', value: name },
		{ name: 'Price: Low to High', value: 'priceAsc' },
		{ name: 'Price: High to Low', value: 'priceDesc' },
	];
	totalCount: number = 0;
	constructor(private shopService: ShopService) {}

	ngOnInit(): void {
		this.getProducts();
		this.getBrands();
		this.getTypes();
	}
	getProducts() {
		this.shopService.getProducts(this.shopParams).subscribe(
			(resp) => {
				this.products = resp.data;
				this.shopParams.pageNumber = resp.pageIndex;
				this.shopParams.pageSize = resp.pageSize;
				this.totalCount = resp.count;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	getBrands() {
		this.shopService.getBrands().subscribe(
			(resp) => {
				this.brands = [{ id: 0, name: 'All' }, ...resp];
			},
			(err) => {
				console.log(err);
			}
		);
	}
	getTypes() {
		this.shopService.getTypes().subscribe(
			(resp) => {
				this.types = [{ id: 0, name: 'All' }, ...resp];
			},
			(err) => {
				console.log(err);
			}
		);
	}

	onBrandSelected(brandId: number) {
		this.shopParams.brandId = brandId;
		this.shopParams.pageNumber = 1;
		this.getProducts();
	}
	onTypeSelected(typeId: number) {
		this.shopParams.typeId = typeId;
		this.shopParams.pageNumber = 1;
		this.getProducts();
	}
	onSortSelected(sort: string) {
		this.shopParams.sort = sort;
		this.getProducts();
	}
	onPageChanged(event) {
		if (this.shopParams.pageNumber !== event.page) {
			this.shopParams.pageNumber = event.page;
			this.getProducts();
		}
	}
	onSearch() {
		this.shopParams.search = this.searchTerm.nativeElement.value;
		this.shopParams.pageNumber = 1;
		this.getProducts();
	}
	onReset() {
		this.searchTerm.nativeElement.value = '';
		this.shopParams = new ShopParams();
		this.getProducts();
	}
}
