import "../css/user.css";
import BoxConfirm from "./BoxConfirm";
import React, { useEffect, useState } from "react";

function UserContent(props) {
  const [showBox, setShowBox] = useState(false);

  const deleteHandler = () => {
    setShowBox(true);
  };
  const boxRef = (content) => {
    if (content === "cance") {
      setShowBox(false);
    }
    if (content === "confirm") {
      setShowBox(false);
      props.onDelete(props.id);
    }
  };
  return (
    <>
      <BoxConfirm product={true} show={showBox} boxRef={boxRef} />
      <tr>
        <td>{props.id}</td>
        <td>{props.email}</td>
        <td>{props.name}</td>
        <td>{props.phone}</td>
        <td>{props.roleUser}</td>
        {props.role === "admin" && (
          <td>
            <button className="btnDelete" onClick={deleteHandler}>
              Delete
            </button>
          </td>
        )}
      </tr>
    </>
  );
}
export default UserContent;
