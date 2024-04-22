import React from "react";
import styled from "styled-components";

const ButtonWrap = styled.button`
  padding: 5px 16px;
  display: block;
  background: green;
  border-radius: 5px;
  color: white;
  &.text-button {
    background: white;
    border: 1px solid green;
    color: black;
  }
  &.small {
    font-size: 10px;
  }
`;

function Button({ children, textOnly, className, ...props }) {
  //props에 기본으로 children이 들어가 있다.
  //컴포넌트 사용처의 버튼에 있는 "클릭" 이라는 글자가 children으로 들어와진다.

  //props는 속성값을 받아온다.
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;

  return (
    <ButtonWrap className={cssClasses} {...props}>
      {children}
    </ButtonWrap>
  );
}

export default Button;
