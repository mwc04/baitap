import { useState, useEffect } from "react";
import axios from "axios";

function Buy() {
  const [sumit, setSumit] = useState({
    username: null,
    price: null,
  });

  const [users, setUsers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Thêm state mới để lưu trữ tổng price

  function onSumit() {
    console.log(sumit);
    axios.post("http://localhost:3000/buys", sumit);
  }

  useEffect(() => {
    axios.get("http://localhost:3000/buys").then(function (a) {
      console.log(a);
      setUsers([...a.data]);
    });
  }, []);

  function handerInput(x) {
    console.log(x.target.value, x.target.name);
    let data = { ...sumit };
    data[x.target.name] = x.target.value;
    setSumit({ ...data });

    // if (x.target.name === "price") {
    //   const totalPrice = users.reduce(
    //     (acc, user) => acc + parseFloat(user.price),
    //     0
    //   ); // Lặp qua users và tính tổng price
    //   setTotalPrice(totalPrice);
    //}
  }

  return (
    <>
      <div>
        <input
          name="username"
          onChange={handerInput}
          type="text"
          placeholder="username"
          value={sumit.username}
        ></input>
        <input
          name="price"
          onChange={handerInput}
          type="text"
          placeholder="bargain price ($)"
          value={sumit.price}
        />
        <img src="./imgs/th.jpeg" alt="error" />
        <button onClick={onSumit}>Create</button>
      </div>
      <p>Tổng số tiền: {totalPrice}</p>
    </>
  );
}

export default Buy;
