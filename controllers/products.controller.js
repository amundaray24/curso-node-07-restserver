const {response, request} = require('express');
const { Types } = require('mongoose');

const Product = require('../models/product');

const { generateResponseError } = require('../helpers/errors.generator.helper');
const { requestPaginatorGenerator, responsePaginationGenerator } = require('../helpers/pagination.generator.helper');


const listProducts = (req= request, res = response) => {
  
  const {page, pageSize} = req.query;
  const requestPagination = requestPaginatorGenerator(page,pageSize);
  
  const category = req.query['category.id'];


  let query = {
    status: true,
    ...(category && {category})
  }

  Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate({ path: 'category', select: ['name']})
      .skip(requestPagination.skip)
      .limit(requestPagination.limit) 
  ])
  .then((response) => {
    const data = response[1];
    if (data.length>0) {
      const pagination = responsePaginationGenerator(requestPagination,data.length,response[0]);
      return res.json({
        data,
        pagination
      });
    }
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Products cant be listed',error);
    generateResponseError(res,400,'Products cant be listed');
  });
}
const createProduct = (req= request, res = response) => {

  const {status, user, ...rest } = req.body;
  const product = new Product({
    ...rest,
    user: Types.ObjectId(req.context.user.id)
  });
  product.save()
    .then((data) => {
      console.log(`Product Created ${data._id}`);
      res.header('Location',`${req.originalUrl}/${data._id}`);
      res.status(201).json({data});
    })
    .catch((error) => {
      console.log('Product cant be created',error);
      generateResponseError(res,400,'Product cant be created');
    });
}

const getProduct = (req= request, res = response) => {

  const { productId } = req.params;

  Product.findOne({
    _id: productId,
    status : true
  })
  .populate({ path: 'category', select: ['name'] })
  .then((data) => {
    res.json({data});
  })
  .catch((error) => {
    console.log('Product cant be find',error);
    generateResponseError(res,400,'Product cant be find');
  });
}

const updateProduct = (req= request, res = response) => {

  const { productId } = req.params;
  const {status, user, ...rest } = req.body;

  Product.findByIdAndUpdate(productId,rest)
  .then( () => {
    console.log(`Product updated ${productId}`);
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Product cant be updated',error);
    generateResponseError(res,400,'Product cant be updated');
  });
}

const deleteProduct = (req= request, res = response) => {
  
  const { productId } = req.params;

  Product.findByIdAndUpdate(productId,{status: false})
  .then( () => {
    console.log(`Product deleted ${productId}`);
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Product cant be deleted',error);
    generateResponseError(res,400,'Product cant be deleted');
  });
}


module.exports = {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}