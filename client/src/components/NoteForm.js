import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_USER_NOTE } from '../utils/mutations';
import Auth from '../utils/auth';

const NoteForm = ({ recipeId }) => {
  const [userNoteText, setUserNoteText] = useState(' ');
  const [characterCount, setCharacterCount] = useState(0);
  const [addUserNote, { error }] = useMutation(ADD_USER_NOTE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUserNote({
        variables: {
          recipeId,
          userNoteText,
          userNoteAuthor: Auth.getProfile().data.username,
        }
      });
      setUserNoteText(' ');
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userNoteText' && value.length <= 360) {
      setUserNoteText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>How was your experience with this recipe?</h4>

      {Auth.loggedIn() ? (
        <>
          <p>
            Character Count: {characterCount}/360
            {error && <span>{error.message}</span>}
          </p>
          <form
            onSubmit={handleFormSubmit}
          >
            <div>
              <textarea
                name="userNoteText"
                placeholder="Your notes here..."
                value={userNoteText}
                onChange={handleChange}
              ></textarea>  
            </div>

            <div>
              <button
                type="submit"
              >
                Add Note
              </button>
            </div>
          </form>  
        </>
      ) : (
        <p>
          Please sign in to add your notes.
        </p>
      )}
    </div>
  );
};

export default NoteForm;