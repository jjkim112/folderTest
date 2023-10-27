export class FormatText {
  static toFormatNum(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  static toFormatThumbNum(n: number): string {
    if (n >= 1000000) {
      return (n / 1000000).toFixed(1) + "M";
    } else if (n >= 1000) {
      return (n / 1000).toFixed(1) + "K";
    } else {
      return n.toString();
    }
  }
}
