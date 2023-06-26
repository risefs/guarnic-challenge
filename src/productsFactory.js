class ProductsFactory {
  constructor(product = {}) {
    this.product = product;
    this.productsType = {
      "Medium Coverage": this.mediumCoverageFactory(),
      "Full Coverage": "x",
      "Low Coverage":"LOW_COVERAGE",
      "Mega Coverage": "x",
      "Special Full Coverage":"SPECIAL_FULL_COVERAGE",
      "Super Sale":"SUPER_SALE"
    }
  }


  applyFactory(){
    const productName = this.product.name
    return this.productsType[productName]
  }

  mediumCoverageFactory(){
    console.info("*** mediumCoverageFactory ***")
    const {  price } = this.product;

    if(  price > 0 ){
      this.product.price  = this.product.price - 1
    }
    this.product.sellIn  = this.product.sellIn - 1

    if(this.product.sellIn < 0 && this.product.price > 0){
      this.product.price  = this.product.price - 1
    }

    return this.product
  }

  fullCoverageFactory(){
    console.info("*** fullCoverageFactory ***");
    const { price } = this.product;

    if(price < 50){
      this.product.price  = this.product.price + 1
    }
    this.product.sellIn  = this.product.sellIn - 1

    if(this.product.sellIn < 0){
      if(this.product.price < 50){
        this.product.price  = this.product.price + 1
      }
    }

    return this.product
  }

  megaCoverageFactory(){
    console.info("*** megaCoverageFactory ***")
  }

}

module.exports = {
  ProductsFactory
}
