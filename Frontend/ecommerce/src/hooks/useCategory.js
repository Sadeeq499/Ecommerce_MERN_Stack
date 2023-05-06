import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
function useCategory() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}//api/category/get-categories`)
      .then((res) => {
        setCategory(res.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   return <div>useCategory</div>;
  return category;
}

export default useCategory;
