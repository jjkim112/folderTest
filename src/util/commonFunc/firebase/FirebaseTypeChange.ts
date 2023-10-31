import { Timestamp } from 'firebase/firestore';
import { List } from 'lodash';

export class FirebaseTypeChange {
  static dateFromData(v: any): Date {
    try {
      if (v === null || v === undefined) {
        return new Date();
      }
      return (v as Timestamp).toDate();
    } catch (e) {
      return new Date();
    }
  }

  static dateNullFromData(v: any): Date | null {
    try {
      if (v === null || v === undefined) {
        return null;
      }
      return (v as Timestamp).toDate();
    } catch (e) {
      return null;
    }
  }

  static stringFromData(v: any): string {
    try {
      if (v === null || v === undefined) {
        return '';
      }
      return v.toString();
    } catch (e) {
      return '';
    }
  }

  static stringNullFromData(v: any): string | null {
    try {
      if (v === null || v === undefined) {
        return null;
      }
      return v.toString();
    } catch (e) {
      return null;
    }
  }

  static numberFromData(v: any): number {
    try {
      if (v === null || v === undefined) {
        return 0;
      }
      return Number(v);
    } catch (e) {
      return 0;
    }
  }

  static numberNullFromData(v: any): number | null {
    try {
      if (v === null || v === undefined) {
        return null;
      }
      return Number(v);
    } catch (e) {
      return null;
    }
  }

  static listFromData(v: any): any[] {
    try {
      if (v === null || v === undefined) {
        return [];
      }
      return v as List<any>[];
    } catch (e) {
      return [];
    }
  }

  static listNullFromData(v: any): any[] | null {
    try {
      if (v === null || v === undefined) {
        return null;
      }
      return v as List<any>[];
    } catch (e) {
      return null;
    }
  }

  static booleanFromData(v: any): boolean {
    try {
      if (v === null || v === undefined) {
        return false;
      }
      return v as boolean;
    } catch (e) {
      return false;
    }
  }

  static booleanNullFromData(v: any): boolean | null {
    try {
      if (v === null || v === undefined) {
        return null;
      }
      return v as boolean;
    } catch (e) {
      return null;
    }
  }

  static anyFromData(v: any): any {
    try {
      if (v === null || v === undefined) {
        return {};
      }
      return v;
    } catch (e) {
      return {};
    }
  }

  static anyNullFromData(v: any): any | null {
    try {
      if (v === null || v === undefined) {
        return null;
      }
      return v;
    } catch (e) {
      return null;
    }
  }
}
