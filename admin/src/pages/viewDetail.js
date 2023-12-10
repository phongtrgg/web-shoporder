import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useRequest from "../hooks/use-request";
import "../css/viewDertail.css";
import BoxConfirm from "../component/BoxConfirm";

function Detail() {
  const { DetailId } = useParams();
  const { request, resData, err, status } = useRequest();
  const session = localStorage.getItem("session");
  const [edit, setEdit] = useState(false);
  const [dataShow, setDataShow] = useState();
  useEffect(() => {
    if (DetailId && session) {
      const data = { id: DetailId, session: session };
      request(data, "order/getDetail");
    }
  }, [DetailId, session]);

  const clickEdit = () => {
    setEdit((prev) => !prev);
  };
  const boxRef = (data) => {
    if (data === "cance") {
      return setEdit(false);
    }
    if (data && typeof data === "object") {
      const dataRequest = {
        id: DetailId,
        session: session,
        delivery: data.delivery,
        status: data.status,
      };
      return request(dataRequest, "order/edit");
    }
  };

  useEffect(() => {
    if (resData && status === 200) {
      setDataShow(resData);
    }
    if (resData && status === 202) {
      const data = { id: DetailId, session: session };
      request(data, "order/getDetail");
      alert("Thay đổi thành công");
      setEdit(false);
    }
  }, [resData]);

  return (
    <div className="layout viewDetail">
      <h1>Infomation Order</h1>
      {dataShow && <p>ID user: {dataShow.user.userId}</p>}
      {dataShow && <p>Full Name: {dataShow.user.name}</p>}
      {dataShow && <p>Phone: {dataShow.user.phone}</p>}
      {dataShow && <p>Address: {dataShow.user.address}</p>}
      {dataShow && <p>Total: {dataShow.total} VND</p>}
      {dataShow && <p>Delivery: {dataShow.delivery}</p>}
      {dataShow && <p>Status: {dataShow.status}</p>}
      <button className="editOrder" onClick={clickEdit}>
        Edit
      </button>
      {edit && (
        <BoxConfirm
          edit={true}
          show={edit}
          boxRef={boxRef}
          delivery={dataShow.delivery}
          status={dataShow.status}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>ID Product</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {dataShow &&
            dataShow.items.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.img} alt="img" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price} VND</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default Detail;
