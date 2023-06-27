const expect = require('chai').expect;
const sinon = require('sinon');

const coTest = require('../src/coTest');
const { ProductsFactory } = require('../src/productsFactory');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;


describe("Co Test", function() {

  it("CarInsurance should be ok", function() {
    const productsFactoryStub = sinon.stub(ProductsFactory.prototype.constructor);
    Object.defineProperty(productsFactoryStub, 'productToProccess', {});
    
    const coTest = new CarInsurance([ new Product("Medium Coverage", 9, 19) ]);
    const products = coTest.updatePrice();

    console.log("products",products)
    expect(products[0].name).equal("Medium Coverage");
  });
  

});

describe("ProductsFactory - mediumCoverageFactory", function() {
  let factory;
  beforeEach(() => {
    factory = new ProductsFactory();
  });

  it("Should decrease", function() {
    const productBody  = { name:"Medium Coverage", sellIn: 10, price: 20 }
    const product = factory.mediumCoverageFactory(productBody);
    expect(product.price).equal(19);
  });

  it("sellIn should to be negative", function() {
    const productBody  = { name:"Medium Coverage", sellIn: 0, price: 20 }
    const product = factory.mediumCoverageFactory(productBody);
    expect(product.sellIn).equal(-1);
  });  

});

describe("ProductsFactory - fullCoverageFactory", function() {
  let factory;
  beforeEach(() => {
    factory = new ProductsFactory();
  });

  it("price should go up", function() {
    const productBody  = { name:"Full Coverage", sellIn: 1, price: 1 }
    const product = factory.fullCoverageFactory(productBody);
    expect(product.price).equal(2);
  });

  it("sellIn should go down", function() {
    const productBody  = { name:"Full Coverage", sellIn: 0, price: 1 }
    const product = factory.fullCoverageFactory(productBody);
    expect(product.sellIn).equal(-1);
  });  

});


describe("ProductsFactory - lowCoverageFactory", function() {
  let factory;
  beforeEach(() => {
    factory = new ProductsFactory();
  });

  it("sellIn should go down", function() {
    const productBody  = { name:"Low Coverage", sellIn: 4, price: 6 }
    const product = factory.lowCoverageFactory(productBody);
    expect(product.sellIn).equal(3);
  });

  it("price should go gown ", function() {
    const productBody  = { name:"Low Coverage", sellIn: -1, price: 3 }
    const product = factory.lowCoverageFactory(productBody);
    expect(product.price).equal(1);
  });  

});

describe("ProductsFactory - megaCoverageFactory", function() {
  let factory;
  beforeEach(() => {
    factory = new ProductsFactory();
  });

  it("sellIn should be the same", function() {
    const productBody  = { name:"Mega Coverage", sellIn: 0, price: 80 }
    const product = factory.megaCoverageFactory(productBody);
    expect(product.sellIn).equal(0);
  });

  it("price should be cero ", function() {
    const productBody  = { name:"Mega Coverage", sellIn: 0, price: 49 }
    const product = factory.megaCoverageFactory(productBody);
    expect(product.price).equal(50);
  });  

});

describe("ProductsFactory - specialCoverageFactory", function() {
  let factory;
  beforeEach(() => {
    factory = new ProductsFactory();
  });

  it("sellIn should go down", function() {
    const productBody  = { name:"Special Full Coverage", sellIn: 14, price: 21 }
    const product = factory.specialCoverageFactory(productBody);
    expect(product.sellIn).equal(13);
  });

  it("price should go up, sellIn less than 11 and price less than 50", function() {
    const productBody  = { name:"Special Full Coverage", sellIn: 10, price: 21 }
    const product = factory.specialCoverageFactory(productBody);
    expect(product.price).equal(23);
  });

  it("price should go up, sellIn less than 6 and price less than 50", function() {
    const productBody  = { name:"Special Full Coverage", sellIn: 5, price: 21 }
    const product = factory.specialCoverageFactory(productBody);
    expect(product.price).equal(24);
  });


  it("price should go up, sellIn less than 0", function() {
    const productBody  = { name:"Full Coverage", sellIn: -1, price: 21 }
    const product = factory.specialCoverageFactory(productBody);
    expect(product.price).equal(0);
  });

});

describe("ProductsFactory - superSaleFactory", function() {
  let factory;
  beforeEach(() => {
    factory = new ProductsFactory();
  });

  it("sellIn should go down", function() {
    const productBody  = { name:"Super Sale", sellIn: 2, price: 4 }
    const product = factory.superSaleFactory(productBody);
    expect(product.sellIn).equal(1);
  });
  
  it("price should be Cero", function() {
    const productBody  = { name:"Super Sale", sellIn: 0, price: 4 }
    const product = factory.superSaleFactory(productBody);
    expect(product.price).equal(0);
  });

});


describe("Constructor Products Types Methods", function() {
  let instance;
  let mediumCoverageFactoryStub;
  let fullCoverageFactoryStub;
  let lowCoverageFactoryStub;
  let megaCoverageFactoryStub;
  let specialCoverageFactoryStub;
  let superSaleFactoryStub;

  beforeEach(() => {
    instance = new ProductsFactory();
    mediumCoverageFactoryStub = sinon.stub(instance, 'mediumCoverageFactory');
    fullCoverageFactoryStub = sinon.stub(instance, 'fullCoverageFactory');
    lowCoverageFactoryStub = sinon.stub(instance, 'lowCoverageFactory');
    megaCoverageFactoryStub = sinon.stub(instance, 'megaCoverageFactory');
    specialCoverageFactoryStub = sinon.stub(instance, 'specialCoverageFactory');
    superSaleFactoryStub = sinon.stub(instance, 'superSaleFactory');
  });

  afterEach(() => {
    sinon.restore();
  });

  it("Each method must be called at least once", function() {
    
    instance.productsType["Medium Coverage"]({name:"Medium Coverage",price:0,sellIn:0});
    sinon.assert.calledOnce(mediumCoverageFactoryStub);

    instance.productsType["Full Coverage"]({name:"Full Coverage",price:0,sellIn:0});
    sinon.assert.calledOnce(fullCoverageFactoryStub);

    instance.productsType["Low Coverage"]({name:"Low Coverage",price:0,sellIn:0});
    sinon.assert.calledOnce(lowCoverageFactoryStub);

    instance.productsType["Mega Coverage"]({name:"Mega Coverage",price:0,sellIn:0});
    sinon.assert.calledOnce(megaCoverageFactoryStub);

    instance.productsType["Special Full Coverage"]({name:"Special Full Coverage",price:0,sellIn:0});
    sinon.assert.calledOnce(specialCoverageFactoryStub);

    instance.productsType["Super Sale"]({name:"Super Sale",price:0,sellIn:0});
    sinon.assert.calledOnce(superSaleFactoryStub);
  
  });
  

});