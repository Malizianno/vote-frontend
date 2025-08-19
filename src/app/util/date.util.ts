import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class DateUtil {
  public static DEFAULT_DATE: NgbDateStruct = { year: 1970, month: 1, day: 1 };

  public static isDateValid(date: any): boolean {
    return date != null && (!isNaN(new Date(date).getTime()) || !isNaN(new Date(+date).getTime()));
  }

  public static isNgbDateValid(dateStruct: NgbDateStruct): boolean {
    return dateStruct != null && dateStruct.year > 0 && dateStruct.month > 0 && dateStruct.day > 0;
  }

  public static formatDateToNgbStruct(date: Date): NgbDateStruct {
    if (!this.isDateValid(date)) {
      return { year: 0, month: 0, day: 0 };
    }

    const parsedDate = new Date(date);

    return {
      year: parsedDate.getFullYear(),
      month: parsedDate.getMonth() + 1, // Months are zero-based in JavaScript
      day: parsedDate.getDate(),
    };
  }

  public static formatNgbStructToDate(dateStruct: NgbDateStruct): Date {
    if (!dateStruct || !this.isNgbDateValid(dateStruct)) {
      return new Date(0); // Return epoch date if invalid
    }

    return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day);
  }
}
