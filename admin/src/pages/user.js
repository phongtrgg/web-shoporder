import UserContent from "../component/UserContent";
import "../css/user.css";
import React, { useState, useEffect } from "react";
import useRequest from "../hooks/use-request";

function User() {
  const { request, err, resData, status } = useRequest();
  const [showUser, setShowUser] = useState();
  const [userAll, setUserAll] = useState();
  const session = localStorage.getItem("session");
  const role = localStorage.getItem("role");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const data = { session: session, role: role };
    request(data, "admin/getUser");
  }, []);

  useEffect(() => {
    if (resData && status === 200) {
      setUserAll(resData);
    }
    if (resData && status === 202) {
      alert("Xoá Thành Công");
      const data = { session: session, role: role };
      request(data, "admin/getUser");
    }
  }, [resData]);
  const prevHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextHandler = () => {
    if (showUser && showUser.length >= 9) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    if (userAll) {
      const start = (page - 1) * 9;
      const end = start + 9;
      setShowUser(userAll.slice(start, end));
    }
  }, [page, userAll]);
  const deleteUser = (id) => {
    const data = { session: session, id: id };
    request(data, "admin/deleteUser");
  };
  return (
    <div className="layout">
      <h1>Users</h1>
      <table className="userContent">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            {showUser && role === "admin" && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {showUser &&
            showUser.length > 0 &&
            showUser.map((item) => {
              return (
                <UserContent
                  key={item._id}
                  id={item._id}
                  email={item.email}
                  phone={item.phone}
                  roleUser={item.role}
                  name={item.fullname}
                  role={role}
                  onDelete={deleteUser}
                />
              );
            })}
        </tbody>
      </table>
      <div className="nextHis">
        <p onClick={prevHandler}>{"<<prev"}</p>
        <p>{page}</p>
        <p onClick={nextHandler}>{"next>>"}</p>
      </div>
    </div>
  );
}
export default User;
