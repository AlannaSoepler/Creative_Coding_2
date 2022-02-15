class dataObject {
  constructor(_title, _number, _price) {
    this.name = _title;
    this.total = _number;
    this.price = _price;
    this.totalPrice = this.calPrice();
  }

  calPrice() {
    this.totalPrice = this.total * this.price;
    return this.totalPrice;
  }
}
