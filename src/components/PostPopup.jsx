import React from 'react';

const PostPopup = ({ post, onClose }) => {
  return (
    <div className="post-popup">
      <div className="post-popup-content">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <button className='button' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PostPopup;
