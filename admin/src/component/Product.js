import "../css/product.css";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import useRequest from "../hooks/use-request";
function Product() {
  const { request, err, resData, status } = useRequest();
  const session = localStorage.getItem("session");
  const role = localStorage.getItem("role");
  const [showP, setShowP] = useState();
  const [product, setProduct] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    request(null, "product/get");
  }, []);

  useEffect(() => {
    if (resData && status === 200) {
      setProduct(resData);
    }
  }, [resData]);
  //
  const prevHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextHandler = () => {
    if (showP && showP.length >= 9) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    if (product) {
      const start = (page - 1) * 9;
      const end = start + 9;
      setShowP(product.slice(start, end));
    }
  }, [page, product]);

  const deleteHanler = () => {
    request(null, "product/get");
  };

  return (
    <div className="boxProduct">
      <h1>Products</h1>
      <table className="tableP">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Count</th>
            <th>Category</th>
            {role && role === "admin" && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {showP &&
            showP.map((item) => {
              return (
                <ProductItem
                  key={item._id}
                  img={item.img1}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  count={item.count}
                  category={item.category}
                  session={session}
                  onDelete={deleteHanler}
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
export default Product;
