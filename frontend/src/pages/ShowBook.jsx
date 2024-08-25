import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { BsArrowLeft } from "react-icons/bs";

const ShowBook = () => {
  const [book, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/books/${id}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit mx-auto">
          <div className="my-4 flex justify-between mx-4 bg-sky-100 py-2 px-3 rounded-md">
            <span className="text-xl mr-4 text-gray-600">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4 flex justify-between mx-4 bg-sky-100 py-2 px-3 rounded-md">
            <span className="text-xl mr-4 text-gray-600">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4 flex justify-between mx-4 bg-sky-100 py-2 px-3 rounded-md">
            <span className="text-xl mr-4 text-gray-600">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4 flex justify-between mx-4 bg-sky-100 py-2 px-3 rounded-md">
            <span className="text-xl mr-4 text-gray-600">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4 flex justify-between mx-4 bg-sky-100 py-2 px-3 rounded-md">
            <span className="text-xl mr-4 text-gray-600">Created Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4 flex justify-between mx-4 bg-sky-100 py-2 px-3 rounded-md">
            <span className="text-xl mr-4 text-gray-600">
              Last Updated Time
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
