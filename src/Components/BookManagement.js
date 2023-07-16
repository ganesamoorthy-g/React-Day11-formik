import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleAddBook = (values, { resetForm }) => {
    const newBook = {
      id: Math.random().toString(36).substring(7),
      ...values,
    };
    setBooks([...books, newBook]);
    resetForm();
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
  };

  const handleUpdateBook = (values, { resetForm }) => {
    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id ? { ...book, ...values } : book
    );
    setBooks(updatedBooks);
    setSelectedBook(null);
    resetForm();
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const validateBookForm = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Title is required';
    }
    if (!values.author) {
      errors.author = 'Author is required';
    }
    if (!values.isbn) {
      errors.isbn = 'ISBN is required';
    }
    if (!values.publicationDate) {
      errors.publicationDate = 'Publication Date is required';
    }
    return errors;
  };

  return (
    <div>
      <h2>Book Management</h2>
      <Formik
        initialValues={{
          id: selectedBook ? selectedBook.id : '',
          title: selectedBook ? selectedBook.title : '',
          author: selectedBook ? selectedBook.author : '',
          isbn: selectedBook ? selectedBook.isbn : '',
          publicationDate: selectedBook ? selectedBook.publicationDate : '',
        }}
        onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
        validate={validateBookForm}
      >
        {({ values }) => (
          <Form>
            <label htmlFor="title">Title:</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" />

            <label htmlFor="author">Author:</label>
            <Field type="text" id="author" name="author" />
            <ErrorMessage name="author" component="div" />

            <label htmlFor="isbn">ISBN:</label>
            <Field type="text" id="isbn" name="isbn" />
            <ErrorMessage name="isbn" component="div" />

            <label htmlFor="publicationDate">Publication Date:</label>
            <Field type="text" id="publicationDate" name="publicationDate" />
            <ErrorMessage name="publicationDate" component="div" />

            <button type="submit">{selectedBook ? 'Update Book' : 'Add Book'}</button>
          </Form>
        )}
      </Formik>

      <h3>Book List:</h3>
      <ul>
        {books.map((book, index) => (
          <li key={book.id || index}>
            Title: {book.title}, Author: {book.author}, ISBN: {book.isbn}, Publication Date:{' '}
            {book.publicationDate}
            <button onClick={() => handleEditBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookManagement;
