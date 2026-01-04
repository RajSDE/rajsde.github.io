import { Component, Input } from '@angular/core';
import { Settings } from '../../models/portfolio';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  @Input() settings!: Settings;
}