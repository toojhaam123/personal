import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // test get users
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((res) => {
        setUsers(res.data);
        console.log("Users:", res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy users:", err);
      });

    // test get products
    axios
      .get("http://127.0.0.1:8000/api/products")
      .then((res) => {
        setProducts(res.data);
        console.log("Products:", res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy products:", err);
      });
  }, []);

  return (
    <div p-4>
      <h1 className="text-center text-red-500 text-xxl">{status}</h1>
      <h2 className="mt-4 front-bold">Danh sách Users:</h2>
      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.id}: {u.name}
          </li>
        ))}
      </ul>
      <h2 className="mt-4 font-bold">Danh sách Products:</h2>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            {p.id}: {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
