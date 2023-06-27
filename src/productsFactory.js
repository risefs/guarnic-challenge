class ProductsFactory {
  constructor() {
    this.productsType = {
      "Medium Coverage": (product)=> this.mediumCoverageFactory(product),
      "Full Coverage": (product) => this.fullCoverageFactory(product),
      "Low Coverage": (product) => this.lowCoverageFactory(product),
      "Mega Coverage": (product) =>  this.megaCoverageFactory(product),
      "Special Full Coverage": (product)=> this.specialCoverageFactory(product),
      "Super Sale": (product)=> this.superSaleFactory(product)
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

  lowCoverageFactory(product){
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

  megaCoverageFactory(product){
    let newProduct =  product;

    if(newProduct.price < 50){
      newProduct.price  = newProduct.price + 1
    }

    return newProduct
  }

  specialCoverageFactory(product){
    let newProduct =  product;

    if(newProduct.price < 50){
      newProduct.price  = newProduct.price + 1

      if(newProduct.sellIn < 11 && newProduct.price < 50){
        newProduct.price  = newProduct.price + 1
      }

      if(newProduct.sellIn < 6 && newProduct.price < 50){
        newProduct.price  = newProduct.price + 1
      }

    }
    newProduct.sellIn  = newProduct.sellIn - 1

    if(newProduct.sellIn < 0){
      newProduct.price = 0//newProduct.price - newProduct.price;
    }

    return newProduct
  }

  superSaleFactory(product){
    let newProduct =  product;

    if( newProduct.price > 0 ){
      newProduct.price  = newProduct.price - 1
    }
    newProduct.sellIn  = newProduct.sellIn - 1

    if(newProduct.sellIn < 0 && newProduct.price > 0){
      newProduct.price  = newProduct.price - 1
    }
    return newProduct
  }

}

module.exports = {
  ProductsFactory
}
