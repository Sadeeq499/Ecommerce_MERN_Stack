import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, Link } from "react-router-dom";

const URL = process.env.REACT_APP_API_URL;
function Product() {
  const [products, setProducts] = useState([]);

  // Get all products
  const getProducts = async () => {
    try {
      await axios.get(`${URL}/api/product/get-products`).then((res) => {
        setProducts(res.data.products);
        // console.log(res.data.products);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getProducts().then((data) => {
    //   setProducts(data);
    // });
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid grid grid-cols-12">
        <div className="col-span-2">
          <AdminMenu />
        </div>
        <div className="col-span-10 ">
          <h1>Products</h1>
          <div className="flex flex-wrap gap-5">
            {/* product card */}
            {products?.map((product) => {
              return (
                <Link
                  key={product._id}
                  to={`/dashboard/admin/product/${product.slug}`}
                >
                  <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg ">
                    <img
                      className="h-48 w-full object-cover object-center"
                      src={`${URL}/api/product/image-product/${product._id}`}
                      alt="Product Image"
                    />
                    <div className="p-4">
                      <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                        {product.name}
                      </h2>
                      <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
                        {product.description}
                      </p>
                      <div className="flex items-center">
                        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                          ${product.price}
                        </p>
                        <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                          $25.00
                        </p>
                        <p className="ml-auto text-base font-medium text-green-500">
                          20% off
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Product;
