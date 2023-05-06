import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
function CartPage() {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  // calculate total price
  const TotalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // remove item from cart
  const removeItem = (id) => {
    try {
      const newCart = [...cart];
      const index = newCart.findIndex((item) => item._id === id);
      newCart.splice(index, 1);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <div className="container mt-8">
          <h1 className="text-center  text-[30px]">{`Hello ${
            auth?.token && auth?.user?.name
          }`}</h1>

          <h3 className="text-center  text-[30px]">
            {cart?.length > 0
              ? `You have ${cart?.length} items in your cart  ${
                  auth?.token ? "" : "Please login to continue"
                }`
              : "Your cart is empty"}
          </h3>
        </div>

        {/* gride system  */}
        <div className="grid grid-cols-12 gap-4 mt-10">
          <div className="col-span-9">
            {/* create a card  */}
            {cart?.map((product) => (
              <div className="max-w-md mx-10 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={`${process.env.REACT_APP_API_URL}/api/product/image-product/${product._id}`}
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      $ {product.price}
                    </div>
                    <a
                      href="#"
                      className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
                    >
                      {product.name}
                    </a>
                    <p className="mt-2 text-gray-500">
                      {product.description.substring(0, 65)}
                    </p>
                    <button
                      onClick={() => {
                        removeItem(product._id);
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mx-16 my-5"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-3">
            <h2>Cart Summery</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h3 className="text-[30px]">Subtotal :{TotalPrice()}</h3>

            {/* check if the user is logged in then show it's detial otherwise redirectto login*/}
            {auth?.token ? (
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mx-16 my-5">
                Checkout
              </button>
            ) : (
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mx-16 my-5">
                <a href="/login">Login</a>
              </button>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CartPage;
