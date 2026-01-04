import { Component, Input } from '@angular/core';
import { ServiceItem } from '../../models/portfolio';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class Services {
  @Input() services!: ServiceItem[];
}