const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const Catagory = mongoose.model('Category')
const Product = mongoose.model('Product')
const Review = mongoose.model('Review')
const User = mongoose.model("User")
exports.Mutation = {

  // add new user
  signupUser: async (parent, { input }, { }) => {
    const user = await User.findOne({ email: input.email })
    if (user) {
      throw new Error("User already exists with that email")
    }
    const hashedPassword = await bcryptjs.hash(input.password, 12)

    const newUser = new User({
      ...input,
      password: hashedPassword
    })
    return await newUser.save()
  },

  // signin user 
  signinUser: async (parent, { input }, { }) => {
    let JWT_SECRET_KEY = "qwerty"
    const user = await User.findOne({ email: input.email })
    if (!user) {
      throw new Error("User dosent exists with that email")
    }
    const doMatch = await bcryptjs.compare(input.password, user.password)
    if (!doMatch) {
      throw new Error("email or password in invalid")
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY)
    return { token }
  },
  // add new category
  addCategory: async (parent, { input }, { db }) => {
    const { name } = input
    const New_Category = new Catagory({
      name,
    })
    return await New_Category.save()
  },

  // update category 
  updateCategory: async (parent, { id, input }, { userId }) => {
    return await Catagory.findByIdAndUpdate(id, { $set: { name: input.name, userId: input.userId } }).exec();
  },

  // add new product
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

  // update product 
  updateProduct: async (parent, { id, input }, { userId }) => {
    return await Product.findByIdAndUpdate(id, { $set: { ...input } }).exec();

  },
  // add new review against pro
  addReview: async (parent, { input }, { }) => {
    const newReview = new Review({
      ...input,
    })

    return await newReview.save()
  },
}
