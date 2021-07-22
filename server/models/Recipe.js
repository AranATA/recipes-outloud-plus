const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    recipeId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    userNotes: [
      {
        userNoteText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 360,
        },
        userNoteAuthor: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        }, 
      },
    ],
});


module.exports = recipeSchema;