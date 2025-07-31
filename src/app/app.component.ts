import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from "./components/contact-list/contact-list.component";
import { ContactDetailComponent } from "./components/contact-detail/contact-detail.component";

@Component({
  selector: 'app-root',
  imports: [ContactListComponent, ContactDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assesment';
   selectedContact!: any;

  onContactSelected(contact: any) {
    this.selectedContact = contact;
  }
}
