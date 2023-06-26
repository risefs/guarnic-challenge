class ProductsFactory {
  constructor() {
    this.productsType = {
      "Medium Coverage": (product)=> this.mediumCoverageFactory(product),
      "Full Coverage": (product) => this.fullCoverageFactory(product),
      "Low Coverage":"LOW_COVERAGE",
      "Mega Coverage": "x",
      "Special Full Coverage":"SPECIAL_FULL_COVERAGE",
      "Super Sale":"SUPER_SALE"
    }
  }


  applyFactory(){
    const productName = this.product.name
    if( productName && this.productsType.hasOwnProperty(productName) ){
      return this.productsType[productName]
    }
    return this.product
  }

  mediumCoverageFactory(product){
    let newProduct =  product;
    if(  newProduct.price > 0 ){
      newProduct.price  = newProduct.price - 1
    }
    newProduct.sellIn  = newProduct.sellIn - 1

    if(newProduct.sellIn < 0 && newProduct.price > 0){
      newProduct.price  = newProduct.price - 1
    }

    return newProduct
  }

  fullCoverageFactory(product){
    let newProduct =  product;

    if(newProduct.price < 50){
      newProduct.price  = newProduct.price + 1
    }
    newProduct.sellIn  = newProduct.sellIn - 1

    if(newProduct.sellIn < 0){
      if(newProduct.price < 50){
        newProduct.price  = newProduct.price + 1
      }
    }

    return newProduct
  }


}

module.exports = {
  ProductsFactory
}
