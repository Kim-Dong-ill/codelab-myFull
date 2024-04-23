import React from "react";

function ListItem({ item, idx, no }) {
  return (
    <li key={idx}>
      <div>
        <span style={{ fontSize: 22 }}>title =</span>
        {no}. {item.title} / 작성자 : {item.user.name}
      </div>
    </li>
  );
}

export default ListItem;
