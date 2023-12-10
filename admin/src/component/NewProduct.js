import "../css/newProduct.css";
import React, { useState, useEffect, useRef } from "react";
import useRequest from "../hooks/use-request";
import { useNavigate, useParams } from "react-router-dom";

function NewP() {
  const session = localStorage.getItem("session");
  const { request, err, resData, status, setErr } = useRequest();
  const [listShow, setListShow] = useState([]);
  const nameRef = useRef();
  const categoryRef = useRef();
  const shortRef = useRef();
  const longRef = useRef();
  const imageRef = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4Ref = useRef();
  const image5Ref = useRef();
  const priceRef = useRef();
  const countRef = useRef();
  const [couter, setCouter] = useState(0);
  const navigate = useNavigate();
  const { EditId } = useParams();

  const submitAdd = (e) => {
    e.preventDefault();
    const photos = [];
    photos.push(imageRef.current.value);
    if (listShow && listShow[0] === 1) {
      photos.push(image2Ref.current.value);
    }
    if (listShow && listShow[1] === 2) {
      photos.push(image3Ref.current.value);
    }
    if (listShow && listShow[2] === 3) {
      photos.push(image4Ref.current.value);
    }
    if (listShow && listShow[3] === 4) {
      photos.push(image5Ref.current.value);
    }
    const data = {
      session: session,
      name: nameRef.current.value,
      category: categoryRef.current.value,
      short: shortRef.current.value,
      long: longRef.current.value,
      price: priceRef.current.value,
      img: photos,
      count: countRef.current.value,
      id: EditId ? EditId : null,
    };
    if (!EditId) {
      return request(data, "admin/add");
    }
    if (EditId) {
      return request(data, "admin/editProduct");
    }
  };

  const addNum = (e) => {
    if (couter === 3) {
      setListShow([]);
      return setCouter(0);
    }
    e.preventDefault();
    setCouter(couter + 1);
    setListShow([...listShow, couter + 1]);
  };
  const clearBtn = () => {
    setListShow([]);
    setCouter(0);
  };

  //
  useEffect(() => {
    if (resData && status === 422) {
      setErr(resData.message);
      setTimeout(() => {
        setErr("");
      }, 3500);
    }
    if (resData && status === 201) {
      alert("Thêm mới thành công");
      navigate("/product");
    }
    if (resData && status === 200) {
      nameRef.current.value = resData.name;
      categoryRef.current.value = resData.category;
      priceRef.current.value = resData.price;
      shortRef.current.value = resData.short_desc;
      longRef.current.value = resData.long_desc;
      countRef.current.value = resData.count;
      if (resData.img1) {
        imageRef.current.value = resData.img1;
      }
      if (resData.img2) {
        setCouter(1);
        setListShow([1]);
      }
      if (resData.img3) {
        setCouter(2);
        setListShow([1, 2]);
      }
      if (resData.img4) {
        setCouter(3);
        setListShow([1, 2, 3]);
      }
    }
    if (resData && status === 202) {
      alert("Edit Thành Công");
      navigate("/product");
    }
  }, [resData]);

  useEffect(() => {
    if (EditId) {
      const data = { id: EditId };
      request(data, "product/getDetail");
    }
  }, [EditId]);

  useEffect(() => {
    if (resData && resData.img2 && listShow[0] === 1) {
      image2Ref.current.value = resData.img2;
    }
    if (resData && resData.img3 && listShow[1] === 2) {
      image3Ref.current.value = resData.img3;
    }
    if (resData && resData.img4 && listShow[2] === 3) {
      image4Ref.current.value = resData.img4;
    }
  }, [listShow]);

  return (
    <>
      {!EditId && <h1>New Product</h1>}
      {EditId && <h1>Edit Product</h1>}
      <form className="formNewP" onSubmit={submitAdd}>
        <label>Product Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter Product Name"
          ref={nameRef}
        />
        <br />
        <label>Category</label>
        <br />
        <input
          type="text"
          placeholder="Enter Category"
          ref={categoryRef}
        />
        <br />
        <label>Price</label>
        <br />
        <input type="number" placeholder="Enter Price" ref={priceRef} />
        <br />
        <label>Count</label>
        <br />
        <input type="number" placeholder="Enter Count" ref={countRef} />
        <br />
        <label>Short Description</label>
        <br />
        <input
          type="text"
          placeholder="Enter Short Description"
          ref={shortRef}
        />
        <br />
        <label>Long Description</label>
        <br />
        <textarea
          type="text"
          placeholder="Enter Long Description"
          className="boxLong"
          ref={longRef}
        ></textarea>
        <br />
        <label>Upload image</label>
        <button className="addImg" onClick={addNum}>
          +
        </button>
        <br />
        <input type="text" ref={imageRef} />
        {listShow && listShow[0] === 1 && (
          <input
            required
            ref={image2Ref}
            name="image2"
            type="text"
            className="imageForm"
          ></input>
        )}
        {listShow && listShow[1] === 2 && (
          <input
            required
            ref={image3Ref}
            name="image3"
            type="text"
            className="imageForm"
          ></input>
        )}
        {listShow && listShow[2] === 3 && (
          <input
            required
            ref={image4Ref}
            name="image4"
            type="text"
            className="imageForm"
          ></input>
        )}
        {listShow && listShow[2] === 3 && (
          <button className="btn-clear" onClick={clearBtn}>
            -
          </button>
        )}
        <br />
        {err && err.length > 0 && <p className="errNew">{err}</p>}
        <br />
        <button onClick={submitAdd} className="btnSubmit">
          Submit
        </button>
      </form>
    </>
  );
}
export default NewP;
