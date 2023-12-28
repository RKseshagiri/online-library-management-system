import './catalog.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../usernav/usernav";
import { useParams } from "react-router-dom";

const Catalog = () => {
  const { username } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books");
        setData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadBooks();
  }, []);

  return (
    <div>
      <Nav username={username} />
      <div className="Catalog-container">
        {data ? (
          <div>
            {data.map((a) => {
              return (
                <div className='book' key={a._id}>
                  <p><b>Name:</b>{a.name}</p>
                  <p><b>Author name:</b> {a.author}</p>
                  <p><b>Is available:</b> {a.availability ? "available" : "Not available"}</p>
                </div>
              );
            })}
          </div>
        ) : (
          "No books"
        )}
      </div>
    </div>
  );
};

export default Catalog;
