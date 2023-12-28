import "./pt.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../usernav/usernav";

const Personaltransaction = () => {
  const { username } = useParams();
  const [data, setData] = useState([]);
  const [book, setBook] = useState('');

  const formatDate = (dueDate) => {
    const date = new Date(dueDate);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  useEffect(() => {
    const onLoad = async () => {
      try {
        const user = await axios.get(
          `http://localhost:5000/users/username/${username}`
        );
        const val = user.data;
        const transaction = await axios.get(
          `http://localhost:5000/transactions/user/${val}`
        );
        setData(transaction.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    onLoad();
  }, [username]);

  const getBook = async (a) => {
    try {
      const id = a.book;
      const books = await axios.get(
        `http://localhost:5000/books/${id}`
      );
      const bookData = books.data;
      setBook(bookData.name);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  useEffect(() => {
    // Fetch book data when data changes
    data.forEach((a) => getBook(a));
  }, [data]);

  return (
    <div>
      <Nav username={username} />
      <div className="personal-transaction-container">
        {data.length > 0 ? (
          data.map((a) => (
            <div className="personal-transaction" key={a._id}>
              <p>
                <b>transaction type </b>
                {a.transactionType}
              </p>
              <p>
                <b>Due Date </b>
                {formatDate(a.dueDate)}
              </p>
              <p><b>Book name </b>{book}</p>
            </div>
          ))
        ) : (
          <p className="no-personal-transaction">"No Transactions"</p>
        )}
      </div>
    </div>
  );
};

export default Personaltransaction;
