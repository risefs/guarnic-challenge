const { ProductsFactory } = require("./productsFactory");

class Product {
  //NOTE: It's forbidden to modify
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    for (var i = 0; i < this.products.length; i++) {
      const productName = this.products[i].name;
      const productToProccess = new ProductsFactory().productsType[productName]
      const productUpdated = productToProccess(this.products[i])
      this.products[i] = productUpdated
    }

    return this.products;
  }
  updatePrice2() {
    for (var i = 0; i < this.products.length; i++) {

      if (this.products[i].name != 'Full Coverage' && this.products[i].name != 'Special Full Coverage') {
        if (this.products[i].price > 0) {
          if (this.products[i].name != 'Mega Coverage') {
            this.products[i].price = this.products[i].price - 1;
          }
        }
      } else {
        if (this.products[i].price < 50) {
          this.products[i].price = this.products[i].price + 1;
          if (this.products[i].name == 'Special Full Coverage') {
            if (this.products[i].sellIn < 11) {
              if (this.products[i].price < 50) {
                this.products[i].price = this.products[i].price + 1;
              }
            }
            if (this.products[i].sellIn < 6) {
              if (this.products[i].price < 50) {
                this.products[i].price = this.products[i].price + 1;
              }
            }
          }
        }
      }
      if (this.products[i].name != 'Mega Coverage') {
        this.products[i].sellIn = this.products[i].sellIn - 1;
      }
      if (this.products[i].sellIn < 0) {
        if (this.products[i].name != 'Full Coverage') {
          if (this.products[i].name != 'Special Full Coverage') {
            if (this.products[i].price > 0) {
              if (this.products[i].name != 'Mega Coverage') {
                this.products[i].price = this.products[i].price - 1;
              }
            }
          } else {
            this.products[i].price = this.products[i].price - this.products[i].price;
          }
        } else {
          if (this.products[i].price < 50) {
            this.products[i].price = this.products[i].price + 1;
          }
        }
      }
    }

    return this.products;
  }
}



module.exports = {
  Product,
  CarInsurance
}
