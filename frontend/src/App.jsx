import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // test get users
    axios
      .get("https://jsonplaceholder.typicode.com/users")
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
    <div>
      <h2 className="mt-4 front-bold">Danh sách Users:</h2>
      <table className="table-auto border-collapse border border-slate-400 bg-danger">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-red-500">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td className="border px-4 py-2 text-red-500">{u.id}</td>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.username}</td>
              <td className="border px-4 py-2">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
