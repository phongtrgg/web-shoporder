function HistoryItem(props) {
  const openDetail = () => {
    props.onDetail(props.id);
  };
  return (
    <>
      <tr className="trBoard" key={props._id}>
        <td>{props.userId}</td>
        <td>{props.name}</td>
        <td>{props.phone}</td>
        <td>{props.address}</td>
        <td>{props.total}</td>
        <td
          className={`${
            props.delivery === "Transported successfully"
              ? "endOrder"
              : "order"
          } hidden`}
        >
          {props.delivery}
        </td>

        <td
          className={`${
            props.status === "Payment has been completed"
              ? "endOrder"
              : "order"
          } hidden`}
        >
          {props.status}
        </td>
        <td>
          <button onClick={openDetail}>View</button>
        </td>
      </tr>
    </>
  );
}
export default HistoryItem;
