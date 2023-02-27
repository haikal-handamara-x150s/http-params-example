import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

interface SimpleActivity {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  key: string;
}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <pre style="border: 1px solid black; min-height: 300px">{{ myActivity | json }}</pre>
    <button (click)="onClickAsync()">Fetch random</button>
  `,
})
export class App {
  name = 'Angular';
  myActivity?: SimpleActivity;

  constructor(private client: HttpClient) { }

  public async onClickAsync() {
    this.getActivity('recreational').subscribe((latest) => {
      this.myActivity = latest;
    }, (e) => {
      alert(e.toString());
    });
  }

  private getActivity(type: string) {
    return this.client.get<SimpleActivity>('https://www.boredapi.com/api/activity', {
      params: new HttpParams({ fromObject: { type } }),
    });
  }
}

bootstrapApplication(App);
