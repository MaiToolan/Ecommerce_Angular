import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule,ReactiveFormsModule,ButtonModule,MessageModule,RippleModule, NgxSpinnerModule,
    AutoFocusModule
  ],
  exports:[CommonModule,FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule,ReactiveFormsModule,ButtonModule,MessageModule,RippleModule, NgxSpinnerModule,
    AutoFocusModule],
})
export class SharedModule { }
