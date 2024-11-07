// src/components/BookForm.js
import React, { useState, useEffect } from 'react';

const BookForm = ({ addBook, editingBook, updateBook }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    year: '',
    genre: '',
    summary: ''
  });

  useEffect(() => {
    if (editingBook) setBook(editingBook);
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBook) {
      updateBook(book);
    } else {
      addBook(book);
    }
    setBook({ title: '', author: '', year: '', genre: '', summary: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
      <input name="year" value={book.year} onChange={handleChange} placeholder="Year" required />
      <input name="genre" value={book.genre} onChange={handleChange} placeholder="Genre" required />
      <textarea name="summary" value={book.summary} onChange={handleChange} placeholder="Summary" required />
      <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
    </form>
  );
};

export default BookForm;
