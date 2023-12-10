import React, { useRef } from "react";
import "../css/boxConfirm.css";

function BoxConfirm(props) {
  const deliveryRef = useRef();
  const statusRef = useRef();

  const ClickCance = () => {
    props.boxRef("cance");
  };
  const ClickConfirm = () => {
    props.boxRef("confirm");
  };
  const ClickSave = () => {
    const data = {
      status: statusRef.current.value,
      delivery: deliveryRef.current.value,
    };
    props.boxRef(data);
  };

  return (
    <>
      {props.product && props.show === true && (
        <tr className="layoutBoxC">
          <h2>Confirm Delete ?</h2>
          <div>
            <button onClick={ClickCance} className="btnBox">
              Cancel
            </button>
            <button onClick={ClickConfirm} className="btnBox">
              Confirm
            </button>
          </div>
        </tr>
      )}
      {props.edit && props.show === true && (
        <div className="layoutBoxC layoutBoxEdit">
          <h2>Edit order</h2>
          <form>
            <div>
              <label>Delivery: </label>
              <select ref={deliveryRef}>
                <option>Waiting for progressing</option>
                <option>Transported successfully</option>
              </select>
            </div>
            <div>
              <label> Status: </label>
              <select ref={statusRef}>
                <option>Waiting for pay</option>
                <option>Payment has been completed</option>
              </select>
            </div>
          </form>
          <div>
            <button onClick={ClickCance} className="btnBox">
              Cance
            </button>
            <button onClick={ClickSave} className="btnBox">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default BoxConfirm;
