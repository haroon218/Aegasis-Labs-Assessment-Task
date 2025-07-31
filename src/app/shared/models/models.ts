export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phoneNumbers: string[];
  address?: string;
}
export interface EmailAddress {
  id: string;
  contactId: string;
  email: string;
  isPrimary: boolean;
  type?: string;
}