import React from "react";
import { Link } from "react-router-dom";

function ListItem({ item, idx, no }) {
  return (
    <li key={idx}>
      <div>
        <span style={{ fontSize: 22 }}>title =</span>
        <Link to={`/blog/${item._id}`}>
          {no}. {item.title} / 작성자 : {item.user.name}
        </Link>
      </div>
    </li>
  );
}

export default ListItem;
