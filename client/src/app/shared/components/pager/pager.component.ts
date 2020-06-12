import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-pager',
	templateUrl: './pager.component.html',
	styleUrls: ['./pager.component.scss'],
})
export class PagerComponent implements OnInit {
	@Input() totalCount: number = 0;
	@Input() pageSize: number = 0;
	@Output() pageChanged = new EventEmitter();
	constructor() {}

	ngOnInit(): void {}
	onPageChanged(event) {
		this.pageChanged.emit(event);
	}
}
