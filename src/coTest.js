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
}



module.exports = {
  Product,
  CarInsurance
}
