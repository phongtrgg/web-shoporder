import "../css/dashboard.css";
import React, { useState, useEffect } from "react";
import useRequest from "../hooks/use-request";
import History from "./history";

function Dashboard() {
  const { request, resData, status, err, setErr } = useRequest();
  const [user, setUser] = useState();
  const [orderAll, setOrderAll] = useState();
  const [count, setCount] = useState();
  const session = localStorage.getItem("session");
  useEffect(() => {
    request(null, "user/length");
  }, []);

  useEffect(() => {
    if (resData && status === 200 && resData.getLength === true) {
      setUser(resData.totalUser);
    }
    if (resData && status === 200 && resData.getAll === true) {
      setOrderAll(resData.orders);
    }
  }, [resData]);

  useEffect(() => {
    if (user) {
      request(null, "order/getAll");
    }
  }, [user]);

  useEffect(() => {
    if (orderAll) {
      let current = 0;
      orderAll.map((item) => {
        return (current = item.total + current);
      });
      return setCount(current);
    }
  }, [orderAll]);

  useEffect(() => {
    setTimeout(() => {
      setErr("");
    }, 3500);
  }, [err]);

  return (
    <>
      <h1>Doashboard</h1>

      <div className="title">
        <div className="userBoard">
          <div>
            {user && <h3>{user}</h3>}
            <p>Client</p>
          </div>
          <div>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon iconBoard"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          </div>
        </div>
        <div className="userBoard">
          <div>
            {user && <h3>{count} VND</h3>}
            <p>Earings of Month</p>
          </div>
          <div>
            <p className="icon iconPrice">$</p>
          </div>
        </div>
        <div className="userBoard">
          <div>
            {orderAll && <h3>{orderAll.length}</h3>}
            <p>New Order</p>
          </div>
          <div>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon iconBoard"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
      {session && <History order={orderAll} />}
    </>
  );
}
export default Dashboard;
