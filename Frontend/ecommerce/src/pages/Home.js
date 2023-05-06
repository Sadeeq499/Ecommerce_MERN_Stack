import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
// import { useAuth } from "../context/auth";
import { Checkbox, Radio } from "antd";
import axios, { all } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import { cart, useCart } from "../context/Cart";

// const url = process.env.REACT_APP_API_URL;

function Home() {
  // const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //hooks
  const [checked, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  //functions

  // handle totoal products
  const handleTotal = async () => {
    const URL = process.env.REACT_APP_API_URL;
    const res = await axios.get(`${URL}/api/product/get-products-count`);
    setTotal(res.data.total);
  };

  // handle filters
  const handleFilters = (isChecked, id) => {
    // const  newChecked = isChecked ? [...checked, id] : checked.filter((c) => c !== id);
    //if checked box is true then push the id into checked state
    let newChecked = [...checked];
    if (isChecked) {
      newChecked.push(id);
    } else {
      //if checked box is false then remove the id from checked state
      newChecked = newChecked.filter((c) => c !== id);
    }
    setCheck(newChecked);
  };

  // get all categories
  const getAllCategories = async () => {
    const URL = process.env.REACT_APP_API_URL;
    const res = await axios.get(`${URL}/api/category/get-categories`);
    if (res.status === 200) {
      // console.log(res.data);
      setCategories(res.data);
    } else {
      console.log("something went wrong");
    }
  };

  // get all products
  const getProducts = async () => {
    try {
      const URL = process.env.REACT_APP_API_URL;
      await axios.get(`${URL}/api/product/get-products`).then((res) => {
        setProducts(res.data.products);
        // console.log(res.data.products);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // get products by filter
  const getProductsByFilter = async () => {
    try {
      const url = process.env.REACT_APP_API_URL;
      await axios
        .post(`${url}/api/product/get-products-by-filter`, {
          checked,
          radio,
        })
        .then((res) => {
          // setProducts([...products, res.data.products]);
          // console.log(res.data.products);
          setProducts(res.data.products);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const url = process.env.REACT_APP_API_URL;
      await axios
        .get(`${url}/api/product/get-products-list/${page}`)
        .then((res) => {
          setLoading(false);
          setProducts([...products, ...res.data.products]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
    if (checked.length || radio.length) getProductsByFilter();
  }, [checked.length, radio.length]);

  // useEffect(() => {
  //   if (checked.length || radio.length) getProductsByFilter();
  // }, [checked, radio]);

  useEffect(() => {
    handleTotal();
    getAllCategories();
    getProducts();

    if (page === 1) {
      loadMore();
    }
  }, [page]);

  return (
    <Layout title={"Hot Offer"}>
      {/* tailwind css grid system 3 and 9 */}
      <div className="grid grid-cols-12 gap-4 mt- ">
        {/* filters  */}
        <div className="col-span-2">
          <h3 className="text-center">filters by Categories</h3>
          <hr />
          <div className="mt-2 mx-10">
            {categories.map((category) => (
              <div key={category._id}>
                <Checkbox
                  onChange={(e) =>
                    handleFilters(e.target.checked, category._id)
                  }
                >
                  {category.name}
                </Checkbox>
              </div>
            ))}
          </div>
          <hr />

          <h3 className="text-center mt-10">filters by Price</h3>
          <hr />
          <div className="mt-2 mx-10 flex">
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              value={radio}
              className="p-2S"
            >
              {Prices.map((price) => (
                <Radio key={price.name} value={price.array} className="p-2">
                  {price.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <hr />

          {/* Reset Button */}
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mx-16 my-5"
          >
            Reset
          </button>
        </div>

        <div className="col-span-10 mt-20">
          {/* create a button in tailwind css */}

          {/* cards */}
          <div className="flex flex-wrap gap-3">
            {/* product card */}
            {products?.map((product) => {
              return (
                <div
                  key={product._id}
                  className="mx-5 my-3 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg "
                >
                  <img
                    className="h-48 w-full object-cover object-center"
                    src={`${process.env.REACT_APP_API_URL}/api/product/image-product/${product._id}`}
                    alt="Product Image"
                  />
                  <div className="p-4">
                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                      {product.name}
                    </h2>
                    <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                      {product.description.substring(0, 65)}
                    </p>
                    <div className="flex items-center">
                      <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                        ${product.price}
                      </p>
                      {/* button view */}
                      <Link
                        to={`/product/${product.slug}`}
                        className="ml-auto px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                      >
                        View
                      </Link>

                      {/* button add to cart */}
                      <button
                        onClick={() => {
                          setCart([...cart, product]);
                          // window.alert(`${product.name} added to cart`);
                          toast.success(`${product.name} added to cart`);
                        }}
                        className="ml-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            {total > 0 && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mx-16 my-5"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
