import { Component, Input } from '@angular/core';
import { ProductItem } from '../../models/portfolio';

@Component({
  selector: 'app-experience',
  standalone: false,
  templateUrl: './experience.html',
  styleUrls: ['./experience.css']
})
export class Experience {
  @Input() products!: ProductItem[];
}