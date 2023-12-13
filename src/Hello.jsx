import { useEffect, useState } from "react";
import axios from "axios";

const Data = () => {
  const [post, setPost] = useState([]);

  async function apifetch() {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      const filteredData = response.data.filter(item => item.userId === 1 && item.id === 6);
      setPost(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    apifetch();
  }, []);

  return (
    <>
      <h1>All list related to this</h1>

      {post.map((list) => (
        <li key={list.id}>
            {list.title}
        </li>
      ))}
    </>
  );
}

export default Data;
