import React from 'react';

const NoteList = ({ userNotes = [] }) => {
  if (!userNotes.length) {
    return <h3>No notes to display yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Notes
      </h3>
      <div className="flex-row my-4">
        {userNotes &&
          userNotes.map((userNote) => (
            <div key={userNote._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {userNote.userNotetAuthor} added this note{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {userNote.createdAt}
                  </span>
                </h5>
                <p className="card-body">{userNote.userNoteText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default NoteList;