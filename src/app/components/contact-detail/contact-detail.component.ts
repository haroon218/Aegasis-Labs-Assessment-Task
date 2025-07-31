import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact, EmailAddress } from '../../shared/models/models';
import { SharedService } from '../../shared/services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-detail',
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
@Input() contact!: any;
  emails: string[] = [];
  activeTab: 'details' | 'messages' = 'details';
private sharedService=inject(SharedService)
  constructor(
   
  ) { }
ngOnChanges() {
  if (this.contact?.id) {
    debugger
    this.sharedService.sendGetRequest('/email_addresses').subscribe((data: any) => {
      this.emails = data
        .filter((e: any) => e.contactId == this.contact.id)
        .map((e: any) => e.email); 
    });
  }
}




  setActiveTab(tab: 'details' | 'messages'): void {
    this.activeTab = tab;
  }

  getPrimaryEmail(): string | undefined {
    return this.contact?.emails.find((email:any) => email.isPrimary)?.email;
  }
}
