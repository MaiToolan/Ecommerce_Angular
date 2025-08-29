import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import {  NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ToastModule,NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone:true
})
export class App {
  protected title = 'Ecommerce';
}
