const mongoose = require('mongoose')
const Catagory = mongoose.model('Category')
const Product = mongoose.model('Product')
const Review = mongoose.model('Review')
exports.Query = {
  hello: () => 'hello from server',

  // find all products
  products: async (parent, { filter }, { userId }) => {
    if (!userId) {
      throw new Error("You must be logged in")
    }
    if (filter) {
      const { onSale, rating } = filter
      if (onSale === true) {
        filtered_Products = await Product.find({ onSale: true })
        return filtered_Products
      }
    } else {
      return await Product.find({})
    }
  },

  // find product by id
  product: async (parent, args, { userId }) => {
    if (!userId) {
      throw new Error("You must be logged in")
    }
    const { id } = args // destructure id from child
    let filtered_Products = await Product.findOne({ _id: id })
    return filtered_Products
  },

  // find all categories
  categories: async (parent, args, { userId }) => {
    if (!userId) {
      throw new Error("You must be logged in")
    }
    let filtered_Categories = await Catagory.find({})
    return filtered_Categories
  },

  // find category by id
  category: async (parent, args, { userId }) => {
    if (!userId) {
      throw new Error("You must be logged in")
    }
    const { id } = args // destructure id from child
    let filtered_Categories = await Catagory.findOne({ _id: id })
    return filtered_Categories
  },

  //find all reviews
  reviews: async (parent, args, { userId }) => {
    if (!userId) {
      throw new Error("You must be logged in")
    }
    return await Review.find({})
  },

  // find review by review id
  review: async (parent, args, { userId }) => {
    if (!userId) {
      throw new Error("You must be logged in")
    }
    const { id } = args
    return await Review.findOne({ _id: id })
  },
}
