import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import styled from "styled-components";
import CommentWrite from "./BlogComp/CommentWrite";
import { useSelector } from "react-redux";
import CommentList from "./BlogComp/CommentList";

// const TitleWrap = styled.h2`
//   font-size: 10px;
//   font-weight: blod;
//   padding: 5px 16px;
//   background: skpblue;
//   display: inline-block;
//   color: white;
//   border-radius: 5px;
// `;

function BlogViewPage() {
  const { blogId } = useParams(); //url에 들어간 params값이 나온다.
  const [blogCon, setBlogCon] = useState(null);
  const [comment, setComment] = useState([]);
  const userData = useSelector(
    (state) => state.user?.userData //없으면 나오지 않는다.
  );

  useEffect(() => {
    async function loadBlogCon() {
      try {
        const res = await axiosInstance.get(`/blog/${blogId}`);
        console.log(res.data);
        setBlogCon(res.data.blog);
      } catch (error) {
        console.log(error);
      }
    }
    loadBlogCon();
  }, []);

  useEffect(() => {
    async function comment() {
      try {
        const res = await axiosInstance.get(`/blog/${blogId}/comment`);
        console.log(res.data.comment);
        setComment(res.data.comment);
      } catch (error) {
        console.log(error);
      }
    }
    comment();
  }, []);

  async function handleInsertComment(commentContent) {
    // alert(commentContent);
    const commentData = {
      content: commentContent,
      userId: userData.user.id,
    };
    console.log(commentData);
    try {
      const res = await axiosInstance.post(
        `/blog/${blogId}/comment`,
        commentData
      );
      console.log(res.data.comment);
      const newComment = res.data.comment;
      setComment([newComment, ...comment]); //기본 댓글 깊은복사후 새로 작성한 데이터 붙인다.
    } catch (error) {
      console.log(error);
    }
  }

  console.log(blogId);

  if (!blogCon) {
    //없다면 null 나옴 그리고 불러오면 데이터 나옴
    //누르자 마자는 데이터를 못불러와서 에러가 나온다. 그래서 조건문으로 null을 보여주다가
    //데이터가 오면 화면에 보여주게 한다.
    return null;
  }
  return (
    <div className="container m-auto p-4">
      <h3>글보기</h3>
      <div>title = {blogCon.title}</div>
      <div>content = {blogCon.content}</div>
      <div>작성자 = {blogCon.user.name}</div>

      <h2>댓글</h2>
      <h4>댓글 작성</h4>
      <CommentWrite onSubmit={handleInsertComment} />
      {comment.length === 0 ? (
        <p>댓글이 없음</p>
      ) : (
        comment.map((item, idx) => {
          return <CommentList comment={item} key={idx} />;
        })
      )}
    </div>
  );
}

export default BlogViewPage;
