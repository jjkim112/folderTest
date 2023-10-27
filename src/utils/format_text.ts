export class FormatText {
  static toFormatNum(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  static toFormatThumbNum(n: number, fixedNum: number): string {
    if (n >= 1000000) {
      return (n / 1000000).toFixed(fixedNum) + "M";
    } else if (n >= 1000) {
      return (n / 1000).toFixed(fixedNum) + "K";
    } else {
      return n.toString();
    }
  }
}
