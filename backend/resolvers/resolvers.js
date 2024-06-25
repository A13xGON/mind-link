const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    try {
      const hashedPassword = await bcrypt.hash(args.password, 12);
      const user = new User({
        name: args.name,
        email: args.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
};
