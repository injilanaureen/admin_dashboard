import React from "react";

const Compose = () => {
  return (
    <div>
      <h2>Compose Email</h2>
      <form>
        <div>
          <label>To:</label>
          <input type="email" />
        </div>
        <div>
          <label>CC:</label>
          <input type="email" />
        </div>
        <div>
          <label>BCC:</label>
          <input type="email" />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" />
        </div>
        <div>
          <label>Message:</label>
          <textarea rows="10"></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Compose;
