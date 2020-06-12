import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-paging-header',
	templateUrl: './paging-header.component.html',
	styleUrls: ['./paging-header.component.scss'],
})
export class PagingHeaderComponent implements OnInit {
	@Input() totalCount: number = 0;
	@Input() pageNumber: number = 0;
	@Input() pageSize: number = 0;
	constructor() {}

	ngOnInit(): void {}
}
