import "../css/history.css";
import { useState, useEffect } from "react";
import HistoryItem from "./historyItem";
import { useNavigate } from "react-router-dom";
function History(props) {
  const [show, setShow] = useState();
  const [page, setpage] = useState(1);
  const navigate = useNavigate();
  const prevHandler = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };
  const nextHandler = () => {
    if (show && show.length >= 10) {
      setpage(page + 1);
    }
  };
  useEffect(() => {
    if (props && page && props.order) {
      const start = (page - 1) * 10;
      const end = start + 10;
      const list = props.order.slice(start, end);
      if (list && list.length > 0) {
        setShow(list);
      }
    }
  }, [page]);
  const openDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <div className="boxHis">
      <h2 className="titleHis">History</h2>
      <table className="tableHis">
        <thead>
          <tr>
            <th>ID User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>address</th>
            <th>Total</th>
            <th className="hidden">Delivery</th>
            <th className="hidden">Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {props &&
            props.order &&
            props.order.map((item) => {
              return (
                <HistoryItem
                  key={item._id}
                  id={item._id}
                  userId={item.user.userId}
                  name={item.user.name}
                  phone={item.user.phone}
                  address={item.user.address}
                  total={item.total}
                  delivery={item.delivery}
                  status={item.status}
                  onDetail={openDetail}
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
export default History;
