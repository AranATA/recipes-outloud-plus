const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    // getSingleUser - By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, arg, context) => {

      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be signed in!');
    },

    users: async () => {
      return User.find().populate('savedRecipes');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('savedRecipes');
    },

    savedRecipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Recipe.find(params).sort({ createdAt: -1 });
    },

    savedRecipe: async (parent, { savedRecipeId }) => {
      return Recipe.findOne({ _id: savedRecipeId });
    },
  },

  Mutation: {

    addUser: async (parent, { firstName, lastName, username, email, password }, context) => {
      const user = await User.create({ firstName, lastName, username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    signIn: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveRecipe: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedRecipes: args.input
            }
          },
          {
            new: true,
            runValidators: true
          }
        );
      }
      throw new AuthenticationError('You need to be signed in!');
    },

    addUserNote: async (parent, { recipeId, userNoteText }, context) => {
      if (context.user) {
        return Recipe.findOneAndUpdate(
          { recipeId: recipeId },
          {
            $addToSet: {
              userNotes: {
                userNoteText,
                userNoteAuthor: context.user.username
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('Please sign in to add notes');
    },

    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedRecipes: { recipeId: recipeId }
            }
          },
          { new: true }
        );
      }
      throw new AuthenticationError('Please sign in to remove recipes');
    },

    removeUserNote: async (parent, { recipeId, userNoteId }, context) => {
      if (context.user) {
        return Recipe.findOneAndUpdate(
          { recipeId: recipeId },
          {
            $pull: {
              userNotes: {
                _id: userNoteId,
                userNoteAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('Please sign in to remove notes');
    },
  },
};

module.exports = resolvers;