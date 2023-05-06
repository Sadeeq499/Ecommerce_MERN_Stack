import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
// import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "antd";

function Category() {
  // const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [Visible, setVisible] = useState(false);
  const [addCVisible, setAddCVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // get all categories
  const getAllCategories = async () => {
    const URL = process.env.REACT_APP_API_URL;
    const res = await axios.get(`${URL}/api/category/get-categories`);
    if (res.status === 200) {
      console.log(res.data);
      setCategories(res.data);
    } else {
      console.log("something went wrong");
    }
  };

  // add category
  const addCategory = async (e) => {
    e.preventDefault();
    const URL = process.env.REACT_APP_API_URL;
    await axios
      .post(`${URL}/api/category/create-category`, { name })
      .then((res) => {
        toast.success(`${name} Category Added Successfully`, {
          autoClose: 1000,
        });
        getAllCategories();
        setName("");
        setAddCVisible(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // update category
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}/api/category/update-category/${selected._id}`,
          { name: updatedName }
        )
        .then((res) => {
          toast.success(`${updatedName} Category Updated Successfully`, {
            autoClose: 1000,
          });
          getAllCategories();
          setVisible(false);
          setSelected(null);
          setUpdatedName("");
        });
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data);
    }
  };

  // delete category

  const deleteCategory = async (id) => {
    try {
      const URL = process.env.REACT_APP_API_URL;
      await axios
        .delete(`${URL}/api/category/delete-category/${id}`)
        .then((res) => {
          toast.success(`Category Deleted Successfully`, {
            autoClose: 1000,
          });
          getAllCategories();
        });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
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
            <div className="flex justify-between  mt-10 mx-10">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  setAddCVisible(true);
                }}
              >
                Add Category
              </button>
            </div>
            {/* component */}
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Categories
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {categories?.map((category) => {
                    return (
                      <>
                        <tr key={category._id} className="hover:bg-gray-50">
                          <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                            <td>{category.name}</td>
                          </th>

                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-4">
                              {/* delete button */}
                              <button
                                x-data="{ tooltip: 'Delete' }"
                                onClick={() => {
                                  deleteCategory(category._id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                  x-tooltip="tooltip"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                              {/* edit button */}
                              <button
                                x-data="{ tooltip: 'Edit' }"
                                onClick={() => {
                                  setVisible(true);
                                  setUpdatedName(category.name);
                                  setSelected(category);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                  x-tooltip="tooltip"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/*adding modal  */}

            {addCVisible && (
              <Modal
                title="Add Category"
                open={addCVisible}
                footer={null}
                onCancel={() => setAddCVisible(false)}
              >
                <CategoryForm
                  handleSubmit={addCategory}
                  value={name}
                  setValue={setName}
                />
              </Modal>
            )}

            {/* edit modal */}
            {Visible && (
              <Modal
                open={Visible}
                title="Update Category"
                footer={null}
                onCancel={() => setVisible(false)}
              >
                <CategoryForm
                  value={updatedName}
                  handleSubmit={updateCategory}
                  setValue={setUpdatedName}
                />
              </Modal>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Category;
