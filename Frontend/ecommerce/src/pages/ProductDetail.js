import React from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();

  //similar product
  const getRelatedProduct = async (pid, cid) => {
    if (!pid || !cid) {
      console.log("Invalid product ID or category ID");
      return;
    }
    try {
      const URL = process.env.REACT_APP_API_URL;
      const res = await axios.get(
        `${URL}/api/product/similar-products/${pid}/${cid}`
      );
      setRelatedProduct(res.data.products);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // single product
  const getProduct = async () => {
    const URL = process.env.REACT_APP_API_URL;
    const res = await axios.get(`${URL}/api/product/get-product/${slug}`);
    setProduct(res.data.product);
    getRelatedProduct(
      res?.data?.product?._id,
      res?.data?.product?.category?._id
    );
    console.log(res.data.product.category._id, res.data.product._id);
    // console.log(res.data.product.category);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Layout>
        <h1>Product Detail page </h1>
        component
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-14 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="Commerce"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={`${process.env.REACT_APP_API_URL}/api/product/image-product/${product._id}`}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="font-bold text-3xl"> ${product.price} </h1>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.name}
                </h1>
                <div className="m-6">
                  <h1 className="font-bold">
                    Category : {product?.category?.name}{" "}
                  </h1>
                </div>
                <p className="leading-relaxed">{product.description}</p>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Quantity : {product.quantity}
                  </span>
                  <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr></hr>
        {/* related products */}
        <section className="m-10">
          <h1 className="text-3xl font-bold">Related Products</h1>

          <div className="flex flex-wrap gap-3">
            {/* product card */}
            {relatedProduct?.map((product) => {
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
                      <button className="ml-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Layout>
    </>
  );
}

export default ProductDetail;
