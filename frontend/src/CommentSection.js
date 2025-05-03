import React, { useState, useEffect } from 'react';

function CommentSection({ requestId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/comments/${requestId}`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error('Fetch comments error:', err));
  }, [requestId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/comments/${requestId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newComment })
    });

    if (response.ok) {
      const updatedRes = await fetch(`http://127.0.0.1:5000/comments/${requestId}`);
      const updatedData = await updatedRes.json();
      setComments(updatedData);
      setNewComment('');
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <h4>Comments</h4>
      {comments.map((c) => (
        <p key={c.id}>💬 {c.message}</p>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default CommentSection;
