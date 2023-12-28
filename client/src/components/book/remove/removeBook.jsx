import React, { useState } from "react";
import Nav from "../../admin/adminnav/nav";
import axios from "axios";
const RemoveBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = async () => {
    try {
      console.log(searchTerm);
      const response = await axios.get(
        `http://localhost:5000/books/search/autocomplete?searchTerm=${searchTerm}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error.message);
    }
    console.log(results);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      alert("Book was deleted successfully");
      setResults([]);
      // Refresh the autocomplete results after deletion
      setSearchTerm("");
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };
  return (
    <div>
      <Nav />
      <div className="remove-book-container">
        <div className="remove-book-input-res-container">
          <label htmlFor="searchTerm">Book name</label>
          <br/>
          <input
            
            name='searchTerm'
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onInput={handleSearch}
            placeholder="Search book name"
          />
          {results.length>0?
          <ul>
            {results.map((book) => (
              <li key={book._id}>
                {book.name}
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </li>
            ))}
          </ul>
          :<p>No books</p>}
        </div>
      </div>
    </div>
  );
};

export default RemoveBook;
