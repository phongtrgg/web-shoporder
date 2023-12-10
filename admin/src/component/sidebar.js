import "../css/sidebar.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRequest from "../hooks/use-request";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const { request, err, resData, status } = useRequest();
  const session = localStorage.getItem("session");
  const roleLC = localStorage.getItem("role");
  const [role, setRole] = useState("");
  const [login, setLogin] = useState();
  const [style, setStyle] = useState("hidden");
  const navigate = useNavigate();
  console.log(role);
  useEffect(() => {
    if (session) {
      setLogin(true);
    }
    if (!session) {
      setLogin(false);
      navigate("/login?mode=login");
    }
  }, [session]);
  useEffect(() => {
    setRole(roleLC);
  }, [roleLC]);
  const logoutHandler = () => {
    const data = { session: session };
    request(data, "logout");
    localStorage.removeItem("role");
    localStorage.removeItem("session");
  };
  const loginHandler = () => {
    navigate("/login?mode=login");
  };
  const showSideBar = () => {
    if (style === "hidden") {
      return setStyle("hidden open");
    }
    if (style === "hidden open") {
      return setStyle("hidden");
    }
  };

  return (
    <React.Fragment>
      <button className="btnMenu show" onClick={showSideBar}>
        ...
      </button>
      <nav className={style}>
        <div className="title">
          <div className="title1">
            <h1 className="hiddenTitle">Admin Page</h1>
          </div>
          <div className="title2"></div>
        </div>
        <div className="boxSidebar">
          <div className="main">
            <h3>MAIN</h3>
            <Link to="/">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
              <p> Dashboard</p>
            </Link>
          </div>
          {login && (
            <div className="lists">
              <h3>LISTS</h3>
              <Link to="/users">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <p> Users</p>
              </Link>
              <Link to="/product">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <p> Products</p>
              </Link>
              <Link to="/livechat">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    className="icon"
                    viewBox="0,0,256,256"
                  >
                    <g fill="#7777">
                      <g transform="scale(9.84615,9.84615)">
                        <path d="M13,0.1875c-7.07422,0 -12.8125,5.06641 -12.8125,11.3125c0,3.17578 1.48828,6.03906 3.875,8.09375c-0.51953,3.00781 -3.88672,4.23438 -3.65625,5.0625c3.00781,1.24609 8.97266,-1.64453 9.875,-2.09375c0.875,0.16797 1.78906,0.25 2.71875,0.25c7.07422,0 12.8125,-5.06641 12.8125,-11.3125c0,-6.24609 -5.73828,-11.3125 -12.8125,-11.3125z"></path>
                      </g>
                    </g>
                  </svg>
                </p>
                <p> LiveChat</p>
              </Link>
            </div>
          )}
          {login && role === "admin" && (
            <div className="new">
              <h3>NEW</h3>
              <Link to="/newProduct">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <p> New Product</p>
              </Link>
              <Link to="/login?mode=signup">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <p> New User</p>
              </Link>
            </div>
          )}
          <div className="user">
            <h3>USER</h3>
            {login && (
              <Link to="">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <p onClick={logoutHandler}>Logout</p>
              </Link>
            )}
            {!login && (
              <Link to="/login?mode=login">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <p onClick={loginHandler}>Login</p>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
export default Sidebar;
