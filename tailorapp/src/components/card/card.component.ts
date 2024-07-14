import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'tailorapp-card',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatRadioModule,FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() options!: string[];
  selectedOption: string = '';

  constructor() { }
}
