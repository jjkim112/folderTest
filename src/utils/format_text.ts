export class FormatText {
  static toFormatNum(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  static toFormatThumbNum(n: number): string {
    if (n >= 1000000) {
      if (Math.floor(n / 100000) % 10 === 0) {
        return Math.floor(n / 1000000) + "M";
      }
      return (n / 1000000).toFixed(1) + "M";
    } else if (n >= 1000) {
      if (Math.floor(n / 100) % 10 === 0) {
        return Math.floor(n / 1000) + "K";
      }
      return (n / 1000).toFixed(1) + "K";
    } else {
      return n.toString();
    }
  }
}
