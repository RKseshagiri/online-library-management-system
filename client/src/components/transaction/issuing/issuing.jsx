import './issuing.css'
import React, { useState } from "react";
import Nav from "../../admin/adminnav/nav";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Issuing = () => {
  const nav = useNavigate();
  const [data, setData] = useState({
    user: "",
    book: "",
    dueDate:new Date(),
    transactionType: "borrowed",
  });

  const [searchTermUser, setSearchTermUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [resultUser, setResultUser] = useState([]);
  const [results, setResults] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/searchUser/autocompleteSearch?searchTerm=${searchTermUser}`
      );
      setResultUser(response.data);
      console.log(resultUser);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/books/search/autocomplete?searchTerm=${searchTerm}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error.message);
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setData((pervdata) => ({
      ...pervdata,
      dueDate: date,
    }));
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, book, dueDate, transactionType } = data;
      const res = await axios.post("http://localhost:5000/transactions", {
        user,
        book,
        dueDate,
        transactionType,
      });
      if (res.status === 201) {
        try {
          const result = await axios.patch(
            `http://localhost:5000/books/${book}`,
            { availability: false }
          );
          if (result.status === 200) {
            nav("/admindashboard");
            alert("book Successfully issued");
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Nav />
      <div className="issue-container">
        <form className="issue-form" onSubmit={handleSubmit}>
          <div className="issue-user-container">
            <label htmlFor="user">User name</label>
            <input
              name="user"
              className="issue-user-name"
              type="text"
              value={searchTermUser}
              placeholder="Username"
              required
              onChange={(e) => {
                setSearchTermUser(e.target.value);
              }}
              onInput={handleUser}
            />
            {resultUser.length > 0 ? (
              <ul>
                {resultUser.map((user) => (
                  <li key={user._id}>
                    {user.username}
                    <button
                      name="user"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(data);
                        setData((prev) => ({
                          ...prev,
                          [e.target.name]: user._id,
                        }));
                        setSearchTermUser(user.username)
                        setResultUser([])
                      }}
                    >
                      Select
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p></p>
            )}
          </div>
          <div className="selec-book-input-res-container">
            <label htmlFor="searchTerm">Book name</label>
            <input
              name="searchTerm"
              type="text"
              className="issue-book-name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onInput={handleSearch}
              placeholder="Search book name"
              required
            />
            {results.length > 0 ? (
              <ul>
                {results.map((book) => (
                  <li key={book._id}>
                    {book.name}
                    <button
                      name="book"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(data);
                        setData((prev) => ({
                          ...prev,
                          [e.target.name]: book._id,
                        }));
                        setSearchTerm(book.name);
                        setResults([])
                      }}
                    >
                      Select
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p></p>
            )}
          </div>
          <div>
            <label>select Date</label>
            <DatePicker
            className="datepicker"
              name="dueDate"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy" // Specify the date format
              required
            />
          </div>
          <button className="btn-issue"type="submit">Issue book</button>
        </form>
      </div>
    </div>
  );
};

export default Issuing;