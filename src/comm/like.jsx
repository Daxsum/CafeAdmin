import React from "react";

const Like = ({ onLiked, Liked }) => {
  let Class = "fa-solid fa-heart";
  if (!Liked) {
    Class = "fa-regular fa-heart";
  }

  return <i onClick={onLiked} className={Class}></i>;
};

export default Like;
