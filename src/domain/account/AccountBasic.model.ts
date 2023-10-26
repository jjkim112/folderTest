import { FirebaseTypeChange } from '../utils/FirebaseTypeChange';

export class AccountBasic {
  email: string;
  name: string;
  phone: string;
  isPubAdmin: boolean;

  constructor(email: string, name: string, phone: string, isPubAdmin: boolean) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.isPubAdmin = isPubAdmin;
  }

  static fromData(data: any): AccountBasic {
    try {
      const email = FirebaseTypeChange.stringFromData(data['email']);
      const name = FirebaseTypeChange.stringFromData(data['name']);
      const phone = FirebaseTypeChange.stringFromData(data['phone']);
      const isPubAdmin = FirebaseTypeChange.booleanFromData(data['isPubAdmin']);

      return new AccountBasic(email, name, phone, isPubAdmin);
    } catch (error) {
      console.log(`[AccountBasic Model] fromData e: ${error}`);
      return AccountBasic.empty;
    }
  }

  static get empty() {
    return new AccountBasic('', '', '', false);
  }

  get toMap() {
    return {
      email: this.email,
      name: this.name,
      phone: this.phone,
      isPubAdmin: this.isPubAdmin,
    };
  }
  get clone() {
    return new AccountBasic(this.email, this.name, this.phone, this.isPubAdmin);
  }
}
