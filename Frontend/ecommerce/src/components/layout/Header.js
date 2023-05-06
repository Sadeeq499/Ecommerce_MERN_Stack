import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";
import { useState } from "react";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";
function Header() {
  const [auth, setAuth] = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const categories = useCategory();
  const [cart] = useCart();

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successful", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      {/* <!-- component --> */}
      <div className="z-auto shadow bg-black">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed " />
        <div className="w-full backdrop-blur-sm">
          <div className="relative z-1 h-16 mx-auto px-5 max-w-7xl flex items-center justify-between text-white">
            <Link
              to="/"
              className="text-4xl hover:text-cyan-400 transition-colors font-FastHand "
            >
              Breeze🕊
            </Link>
            <ul className="flex items-center gap-5 cursor-pointer ">
              <SearchInput />
              <li>
                <NavLink
                  to="/"
                  className="hover:text-cyan-400 transition-colors "
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="hover:text-cyan-400 transition-colors">
                  {" "}
                  Category
                </NavLink>
              </li>

              {/* if there is no token in local storage then register and login should be displayed
        else logout should be displayed
       */}

              {!auth.user ? (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="relative  inline-block text-left ">
                    <button
                      onClick={handleToggle}
                      className="group w-full inline-flex justify-between items-center hover:text-cyan-400 transition-colors focus:outline-none"
                    >
                      <span>{auth.user.name}</span>
                    </button>
                    <ul
                      className={`${
                        showMenu ? "block" : "hidden"
                      } absolute z-10 py-2 mt-2 w-48 bg-white rounded-md shadow-lg text-black`}
                    >
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth.user.role === 1 ? "admin" : "user"
                          }`}
                          className="block px-4 py-2 hover:text-cyan-400 transition-colors"
                          onClick={handleToggle}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li>
                <Badge count={cart?.length} showZero>
                  {/* <Avatar shape="square" size="large" /> */}
                  <NavLink
                    to="/cart"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    <h3 className="text-zinc-50  text-lg">Cart</h3>
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
