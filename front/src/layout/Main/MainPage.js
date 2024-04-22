import React from "react";
import Button from "../../components/Button";

function MainPage() {
  return (
    <div>
      MainPage
      <Button textOnly={true} className="small" data="test" dong="dong">
        클릭하세요
      </Button>
    </div>
  );
}

export default MainPage;
