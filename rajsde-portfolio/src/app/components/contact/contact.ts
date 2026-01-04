import { Component, Input } from '@angular/core';
import { Settings } from '../../models/portfolio';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  @Input() settings!: Settings;
}