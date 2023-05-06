import Layout from "../components/layout/Layout";
import React from "react";
import { useQuery } from "../context/Search";
import { Link } from "react-router-dom";

function SearchedProducts() {
  const [query, setQuery] = useQuery();

  return (
    <>
      <Layout>
        {query?.results?.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {/* product card */}
            {query?.results?.map((product) => {
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
                        to={`#`}
                        className="ml-auto px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                      >
                        View
                      </Link>
                      {/* button add to cart */}
                      <Link
                        to={`#`}
                        className="ml-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                      >
                        Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold">No products found</h1>
          </div>
        )}
      </Layout>
    </>
  );
}

export default SearchedProducts;
