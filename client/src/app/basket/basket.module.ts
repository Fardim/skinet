import { SharedModule } from './../shared/shared.module';
import { BabasketRoutingModule } from './babasket-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';

@NgModule({
	declarations: [BasketComponent],
	imports: [CommonModule, BabasketRoutingModule, SharedModule],
})
export class BasketModule {}
