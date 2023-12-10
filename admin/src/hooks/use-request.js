import { useState } from "react";

function useRequest() {
  const [resData, setResData] = useState();
  const [status, setStatus] = useState();
  const [err, setErr] = useState();

  const request = async (data, url) => {
    try {
      if (data) {
        console.log("dataRequest", data);
        const response = await fetch(
          `https://order-app-deloy-604e8cc734c9.herokuapp.com/${url}`,
          // `https://localhost:5000/${url}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const resData = await response.json();
        const stt = await response.status;
        setStatus(stt);
        setResData(resData);
      } else {
        const response = await fetch(
          `https://order-app-deloy-604e8cc734c9.herokuapp.com/${url}`
          // `https://localhost:5000/${url}`
        );
        const resData = await response.json();
        const stt = await response.status;
        setStatus(stt);
        setResData(resData);
      }
    } catch (err) {
      setErr(err);
    }
  };
  return { resData, request, setResData, err, setErr, status, setStatus };
}

export default useRequest;

//test: request(data,'/login')
