import { Component } from '@angular/core';
import { DataFormComponent } from './shared/data-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'base-project';
  lista: any;

  constructor() {
    this.get();
  }

  get() {

  }
}
