import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function AuthorManagement() {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleAddAuthor = (values, { resetForm }) => {
    const newAuthor = {
      id: Math.random().toString(36).substring(7),
      ...values,
    };
    setAuthors([...authors, newAuthor]);
    resetForm();
  };

  const handleEditAuthor = (author) => {
    setSelectedAuthor(author);
  };

  const handleUpdateAuthor = (values, { resetForm }) => {
    const updatedAuthors = authors.map((author) =>
      author.id === selectedAuthor.id ? { ...author, ...values } : author
    );
    setAuthors(updatedAuthors);
    setSelectedAuthor(null);
    resetForm();
  };

  const handleDeleteAuthor = (id) => {
    const updatedAuthors = authors.filter((author) => author.id !== id);
    setAuthors(updatedAuthors);
  };

  const validateAuthorForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.birthDate) {
      errors.birthDate = 'Birth Date is required';
    }
    if (!values.biography) {
      errors.biography = 'Biography is required';
    }
    return errors;
  };

  return (
    <div>
      <h2>Author Management</h2>
      <Formik
        initialValues={{
          id: selectedAuthor ? selectedAuthor.id : '',
          name: selectedAuthor ? selectedAuthor.name : '',
          birthDate: selectedAuthor ? selectedAuthor.birthDate : '',
          biography: selectedAuthor ? selectedAuthor.biography : '',
        }}
        onSubmit={selectedAuthor ? handleUpdateAuthor : handleAddAuthor}
        validate={validateAuthorForm}
      >
        {({ values }) => (
          <Form>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />

            <label htmlFor="birthDate">Birth Date:</label>
            <Field type="text" id="birthDate" name="birthDate" />
            <ErrorMessage name="birthDate" component="div" />

            <label htmlFor="biography">Biography:</label>
            <Field type="text" id="biography" name="biography" />
            <ErrorMessage name="biography" component="div" />

            <button type="submit">{selectedAuthor ? 'Update Author' : 'Add Author'}</button>
          </Form>
        )}
      </Formik>

      <h3>Author List:</h3>
      <ul>
        {authors.map((author, index) => (
          <li key={author.id || index}>
            Name: {author.name}, Birth Date: {author.birthDate}, Biography: {author.biography}
            <button onClick={() => handleEditAuthor(author)}>Edit</button>
            <button onClick={() => handleDeleteAuthor(author.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorManagement;
