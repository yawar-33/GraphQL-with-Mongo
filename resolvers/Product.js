const mongoose = require('mongoose')
const Catagory = mongoose.model('Category')
const Review = mongoose.model('Review')

exports.Product = {
  // categ against products
  category: async ({ categoryId }, args, { db }) => {
    return await Catagory.findOne({ _id: categoryId })
  },

  // reviews against product
  reviews: async (parent, args, {}) => {
    let { id } = parent
    return await Review.find({ productId: id })
  },
}
