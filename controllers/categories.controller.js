const {response, request} = require('express');
const { Types } = require('mongoose');

const Category = require('../models/category');

const { generateResponseError } = require('../helpers/errors.generator.helper');
const { paginationGenerator } = require('../helpers/pagination.generator.helper');

const listCategories = (req = request, res = response) => {

  const {page = 0, pageSize = 10 } = req.query;
  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);

  Promise.all([
    Category.countDocuments({status : true}),
    Category.find({status : true})
      //.populate('user',['firstName','secondName','lastName','secondLastName'])
      .skip(pageNumber === 0 ? 0 : (pageNumber-1)*pageSizeNumber)
      .limit(pageSizeNumber)    
  ])
  .then((response) => {
    const data = response[1];
    if (data.length>0) {
      const pagination = paginationGenerator(pageNumber,pageSizeNumber,data.length,response[0]);
      return res.json({
        data,
        pagination
      });
    }
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Categories cant be listed',error);
    generateResponseError(res,400,'Categories cant be listed');
  });
}

const createCategory = async (req = request, res = response) => {
  const {name, description } = req.body;
  const category = new Category({
    name : name.toUpperCase(),
    description: description.toUpperCase(),
    userId: Types.ObjectId(req.context.user.id)
  });
  category.save()
    .then((data) => {
      console.log(`Category Created ${data._id}`);
      res.header('Location',`${req.originalUrl}/${data._id}`);
      res.status(201).json({data});
    })
    .catch((error) => {
      console.log('Category cant be created',error);
      generateResponseError(res,400,'Category cant be created');
    });
}

const getCategory = (req = request, res = response) => {

  const { categoryId } = req.params;

  Category.findOne({
    _id: categoryId,
    status : true
  })
  .then((data) => {
    res.json({data});
  })
  .catch((error) => {
    console.log('Category cant be find',error);
    generateResponseError(res,400,'Category cant be find');
  });
}

const updateCategory = (req = request, res = response) => {
  
  const { categoryId } = req.params;
  const { name, description } = req.body;

  Category.findByIdAndUpdate(categoryId,{
    name : name ? name.toUpperCase() : name,
    description: description ? description.toUpperCase() : description
  })
  .then( () => {
    console.log(`Category updated ${categoryId}`);
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Category cant be updated',error);
    generateResponseError(res,400,'Category cant be updated');
  });
}

const deleteCategory = (req = request, res = response) => {

  const { categoryId } = req.params;

  Category.findByIdAndUpdate(categoryId,{status: false})
  .then( () => {
    console.log(`Category deleted ${categoryId}`);
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log('Category cant be deleted',error);
    generateResponseError(res,400,'Category cant be deleted');
  });
}

module.exports = {
  listCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
}