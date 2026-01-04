import { Component, Input } from '@angular/core';
import { Settings } from '../../models/portfolio';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero {
  @Input() settings!: Settings;
}