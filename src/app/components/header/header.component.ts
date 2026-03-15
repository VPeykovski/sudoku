import { Component, signal } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatSlideToggle, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  currentLang = this.getCurrentLang();
  isDarkMode = signal(false);

  ngOnInit() {
    const hasLocalStorage = localStorage.getItem('theme');

    if (!hasLocalStorage) {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      this.isDarkMode.set(prefersDark);
    } else {
      this.isDarkMode.set(localStorage.getItem('theme') === 'dark');
    }

    document.documentElement.setAttribute(
      'theme',
      this.isDarkMode() ? 'dark' : 'light',
    );
  }

  getCurrentLang(): string {
    return window.location.pathname.startsWith('/bg') ? 'bg' : 'en';
  }

  switchLanguage(lang: string) {
    if (lang === 'bg') {
      window.location.href = '/bg/';
    } else {
      window.location.href = '/en/';
    }
  }

  switchTheme() {
    const newTheme = this.isDarkMode() ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('theme', newTheme);
    this.isDarkMode.set(!this.isDarkMode());
  }
}
