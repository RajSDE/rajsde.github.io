import { Component, Input } from '@angular/core';
import { Settings } from '../../models/portfolio';

@Component({
  selector: 'app-footer', 
  standalone: false,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  @Input() settings!: Settings;
  currentYear = new Date().getFullYear();
}