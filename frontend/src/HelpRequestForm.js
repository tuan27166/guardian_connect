import React, { useState } from 'react';

function HelpRequestForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isVip, setIsVip] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/post_help', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, is_vip: isVip })
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('Help request posted successfully!');
      setTitle('');
      setDescription('');
      setIsVip(false);
    } else {
      setMessage(data.message || 'Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Submit a Help Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br />
        <label>
          <input
            type="checkbox"
            checked={isVip}
            onChange={(e) => setIsVip(e.target.checked)}
          />
          VIP
        </label><br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default HelpRequestForm;
