const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const Catagory = mongoose.model('Category')
const Product = mongoose.model('Product')
const Review = mongoose.model('Review')

exports.Mutation = {
  addCategory: async (parent, { input }, { db }) => {
    const { name } = input
    const New_Category = new Catagory({
      name,
    })
    return await New_Category.save()
  },

  addProduct: async (parent, { input }, { db }) => {
    const {
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    } = input

    const newProduct = new Product({
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId,
    })

    return await newProduct.save()
  },

  addReview: async (parent, { input }, {}) => {
    const newReview = new Review({
      ...input,
    })

    return await newReview.save()
  },
}
