// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Handle book creation
  const addBook = async (book) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', book);
      setBooks([...books, response.data.book]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Handle book update
  const updateBook = async (updatedBook) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/books/${updatedBook._id}`, updatedBook);
      setBooks(books.map(book => book._id === updatedBook._id ? response.data.book : book));
      setEditingBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Handle book deletion
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="App">
      <h1>Book Management System</h1>
      <BookForm addBook={addBook} editingBook={editingBook} updateBook={updateBook} />
      <BookList books={books} setEditingBook={setEditingBook} deleteBook={deleteBook} />
    </div>
  );
};

export default App;
