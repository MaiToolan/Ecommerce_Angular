import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProducts } from '../../../core/interfaces/http';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone:true,
})
export class Card {
    @Input({ required: true }) isSmallCard: boolean = false;
   @Input({ required: true }) Products!: IProducts[];
}
