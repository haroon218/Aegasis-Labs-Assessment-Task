import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact, EmailAddress } from '../../shared/models/models';
import { SharedService } from '../../shared/services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Output() contactSelected = new EventEmitter<any>();
private sharedService=inject(SharedService)
contacts: any[] = [];
  filteredContacts: any[] = [];
  searchTerm = '';
loading:boolean=false

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading=true
    this.sharedService.sendGetRequest('/contacts').subscribe({
      next: (contacts:any) => {
        debugger
        this.contacts = contacts;
        this.filteredContacts = [...contacts];
      },
      error: (err) => {
      this.loading=false
      },complete:()=>{
        this.loading=false
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredContacts = [...this.contacts];
      return;
    }
    debugger
    const term = this.searchTerm.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(term) ||
      contact.lastName.toLowerCase().includes(term) ||
      contact.jobTitle.toLowerCase().includes(term) 
    );
  }
  selectContact(contact: Contact) {
    this.contactSelected.emit(contact); 
  }
}
