import React from "react";

function CommentList({ comment }) {
  return (
    <div>
      {comment.content} / {comment.user.name}
      <button>삭제</button>
      {/* 데이터 삭제버튼을 눌렀을때 BlogList에서 안보여야하니까 그곳으로 comment의id를 가지고 가야한다. */}
    </div>
  );
}

export default CommentList;
