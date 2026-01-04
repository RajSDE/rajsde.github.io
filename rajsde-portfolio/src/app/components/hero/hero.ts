import { Component, Input, AfterViewInit } from '@angular/core';
import { Settings } from '../../models/portfolio';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements AfterViewInit {
  @Input() settings!: Settings;

  ngAfterViewInit() {
    // This forces the LinkedIn script to load ONLY after the HTML is ready
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}