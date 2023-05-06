import React from "react";

function CategoryForm({ handleSubmit, value, setValue }) {
  return (
    <>
      {/* category adding form  */}

      <div className="flex items-center justify-center">
        <div className=" w-80 ">
          <form onSubmit={handleSubmit}>
            <p className="font-semibold text-gray-700">
              ⭐Add New Category here⭐
            </p>
            <input
              type="text"
              className="h-10 w-full rounded border p-2 text-sm"
              placeholder="Enter Category Name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="rounded bg-[#FD5E57] text-gray-50 hover:bg-gradient-to-r hover:from-[#FD5E57] hover:to-[#FC477E]
      justify-center w-full p-2 mt-2
    "
            >
              Add Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CategoryForm;
