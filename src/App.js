import React from 'react';
import BookManagement from './Components/BookManagement';
import AuthorManagement from './Components/AuthorManagement';

function App() {
  return (
    <div className="container">
      <h1>Application Form</h1>
      <div className="form-container">
        <div className="form-section">
          <BookManagement />
        </div>
        <div className="form-section">


          <AuthorManagement />
        </div>
      </div>
    </div>
  );
}

export default App;
