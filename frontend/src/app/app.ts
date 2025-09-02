import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit(): void {
    this.testFetch();
  }
  protected readonly title = signal('frontend');

  protected readonly fetchResult = signal<string | null>(null);

  async testFetch() {
    try {
      const response = await fetch('http://localhost:3000/items');
      const text = await response.text();
      this.fetchResult.set(text);
    } catch (error) {
      this.fetchResult.set('Fetch error');
    }
  }
}
