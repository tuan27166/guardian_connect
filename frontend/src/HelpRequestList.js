import React, { useEffect, useState } from 'react';

function HelpRequestList() {
  const [helpRequests, setHelpRequests] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchHelpRequests();
  }, []);

  const fetchHelpRequests = async () => {
    const response = await fetch('http://127.0.0.1:5000/help_requests');
    const data = await response.json();
    setHelpRequests(data);

    // Fetch comments for each request
    const allComments = {};
    for (const req of data) {
      const res = await fetch(`http://127.0.0.1:5000/comments/${req.id}`);
      allComments[req.id] = await res.json();
    }
    setComments(allComments);
  };

  const handleCommentChange = (id, value) => {
    setCommentText({ ...commentText, [id]: value });
  };

  const handleCommentSubmit = async (requestId) => {
    const text = commentText[requestId];
    if (!text) return;

    await fetch(`http://127.0.0.1:5000/comments/${requestId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    setCommentText({ ...commentText, [requestId]: '' });
    fetchHelpRequests();
  };

  const handleClearAllRequests = async () => {
    await fetch('http://127.0.0.1:5000/clear_requests', { method: 'DELETE' });
    fetchHelpRequests();
  };

  return (
    <div>
      <h1>Help Requests</h1>
      <button onClick={handleClearAllRequests}>Clear All Requests</button>
      {helpRequests.map(req => (
        <div key={req.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <h3>{req.title}</h3>
          <p>{req.description}</p>
          {req.is_vip && <strong>VIP</strong>}
          <div>
            <h4>Comments</h4>
            {comments[req.id]?.map((c) => (
              <p key={c.id}>💬 {c.message}</p>
            ))}
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText[req.id] || ''}
              onChange={(e) => handleCommentChange(req.id, e.target.value)}
            />
            <button onClick={() => handleCommentSubmit(req.id)}>Add Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HelpRequestList;
