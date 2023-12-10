import React, { useState, useEffect } from "react";
import "../css/product.css";
import BoxConfirm from "./BoxConfirm";
import useRequest from "../hooks/use-request";
import { useNavigate } from "react-router-dom";

function ProductItem(props) {
  const { request, resData, err, status } = useRequest();
  const role = localStorage.getItem("role");
  const [showBox, setShowBox] = useState(false);
  const navigate = useNavigate();

  const OnUpdate = () => {
    navigate(`/edit/${props.id}`);
  };
  const OnDelete = () => {
    setShowBox(true);
  };
  const boxRef = (content) => {
    if (content === "cance") {
      setShowBox(false);
    }
    if (content === "confirm") {
      const data = { session: props.session, id: props.id };
      request(data, "admin/delete");
    }
  };

  useEffect(() => {
    if (resData && status === 202) {
      props.onDelete();
    }
  }, [resData]);

  return (
    <>
      <BoxConfirm product={true} show={showBox} boxRef={boxRef} />
      <tr>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.price}</td>
        <td>
          <img src={props.img} alt="img" />
        </td>
        <td className="center">{props.count}</td>
        <td>{props.category}</td>
        {role && role === "admin" && (
          <td>
            <button onClick={OnUpdate} className="btnUpdate">
              Update
            </button>
            <button onClick={OnDelete} className="btnDelete">
              Delete
            </button>
          </td>
        )}
      </tr>
    </>
  );
}
export default ProductItem;
