import React, { useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "antd";
import { useParams, useNavigate } from "react-router-dom";

function ProductUpdate() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");

  // all categories
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

  // get product

  const getSingleProduct = async () => {
    try {
      const URL = process.env.REACT_APP_API_URL;
      await axios.get(`${URL}/api/product/get-product/${slug}`).then((res) => {
        // console.log(res.data.product);
        setName(res.data.product.name);
        setDescription(res.data.product.description);
        setPrice(res.data.product.price);
        setCategory(res.data.product.category._id);
        setQuantity(res.data.product.quantity);
        setId(res.data.product._id);
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getAllCategories();
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_API_URL;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      // formData.append("shipping", shipping);
      image && formData.append("image", image);

      await axios
        .put(`${url}/api/product/update-product/${id}`, formData)
        .then((res) => {
          toast.success(`Product Updated Successfully`, { autoClose: 1000 });
          // console.log(res.data);
          navigate("/dashboard/admin/products");
        });
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      // navigate("/dashboard/admin/products");
    }
  };

  // delete product
  const handleDelete = async () => {
    try {
      const url = process.env.REACT_APP_API_URL;
      await axios
        .delete(`${url}/api/product/delete-product/${id}`)
        .then((res) => {
          toast.success(`Product Deleted Successfully`, { autoClose: 1000 });
          // console.log(res.data);
          navigate("/dashboard/admin/products");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Layout>
        <div className="container-fluid grid grid-cols-12">
          <div className="col-span-2">
            <AdminMenu />
          </div>
          <div className="col-span-10 ">
            <h1>Categories</h1>
            {/* categories */}

            <div className="flex flex-col mx-64">
              <label
                className="mb-2 font-bold text-lg text-gray-700"
                htmlFor="category"
              >
                category
              </label>
              <Select
                showSearch
                style={{ width: 400 }}
                placeholder="Select a category"
                optionFilterProp="children"
                value={category}
                onChange={(value) => setCategory(value)}
                required
              >
                {categories.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>

              {/* upload image */}

              <label
                className="mb-2 font-bold text-lg text-gray-700"
                htmlFor="image"
              >
                {image ? image.name : "Upload image"}
              </label>
              <input
                type="file"
                name="image"
                style={{ width: 400 }}
                className="border border-gray-400 p-2"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {/* preview of image */}

              <label
                className="mx-10 flex font-bold text-lg text-gray-700  text-center"
                htmlFor="image"
              >
                Preview
              </label>
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `${process.env.REACT_APP_API_URL}/api/product/image-product/${id}`
                }
                alt="preview"
                style={{ width: 400 }}
              />

              {/* name */}

              <label
                className="mb-2 font-bold text-lg text-gray-700"
                htmlFor="name"
              >
                name
              </label>
              <input
                type="text"
                name="name"
                style={{ width: 400 }}
                className="border border-gray-400 p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* description */}

              <label
                className="mb-2 font-bold text-lg text-gray-700"
                htmlFor="description"
              >
                description
              </label>
              <textarea
                type="text"
                name="description"
                style={{ width: 400 }}
                className="border border-gray-400 p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              {/* price */}

              <label
                className="mb-2 font-bold text-lg text-gray-700"
                htmlFor="price"
              >
                price
              </label>
              <input
                type="number"
                name="price"
                style={{ width: 400 }}
                className="border border-gray-400 p-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              {/* quantity */}

              <label
                className="mb-2 font-bold text-lg text-gray-700"
                htmlFor="quantity"
              >
                quantity
              </label>
              <input
                type="number"
                name="quantity"
                style={{ width: 400 }}
                className="border border-gray-400 p-2"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                max={1000}
                min={10}
              />

              {/* shipping
            <Select
              className="border border-gray-400 p-2 mt-5"
              value={shipping}
              onChange={(value) => setShipping(value)}
              style={{ width: 400 }}
            >
              <Select.Option value="">Select shipping</Select.Option>
              <Select.Option value="0">No</Select.Option>
              <Select.Option value="1">Yes</Select.Option>
            </Select> */}
              <div className="flex">
                {/* submit button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 mt-5"
                  style={{ width: 197 }}
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
                {/* Delete button */}
                <button
                  type="submit"
                  className="bg-red-700 text-white p-2 mt-5 mx-6"
                  style={{ width: 180 }}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ProductUpdate;
