import React from "react";

// Delete button that takes all props passed so they don't have to each be called individually
function DeleteBtn(props) {
  return (
    <span {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default DeleteBtn;