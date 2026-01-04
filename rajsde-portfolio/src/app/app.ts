import { Component, OnInit, AfterViewInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { DataService } from './services/data'; 
import { PortfolioData } from './models/portfolio';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, AfterViewInit {
  data: PortfolioData | null = null;
  showScrollBtn = false;
  isBrowser: boolean;

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // FIX: Only fetch data if we are running in the browser!
    // This prevents the build process from crashing.
    if (this.isBrowser) {
      this.dataService.getData().subscribe({
        next: (response) => {
          this.data = response;
        },
        error: (err) => console.error('Failed to load data', err)
      });
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.1 });

      setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
      }, 500);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.showScrollBtn = window.scrollY > 300;
    }
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}