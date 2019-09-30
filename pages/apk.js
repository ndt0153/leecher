import React from "react";
import fetch from "isomorphic-unfetch";

ApkPage.getInitialProps = async req => {
  const { id } = req.query;
  const res = await fetch(`http://localhost:2000/apk/${id}`);
  const json = await res.json();
  return { data: json };
};
export default function ApkPage(props) {
  return (
    <div>
      <div className="title">
        <h2>{props.data.Title}</h2>
      </div>
      <div className="info">
        <span className="publish">{props.data.Publist}</span>
        <span className="genre">{props.data.Category.toString()}</span>
        <span className="version">{props.data.Version}</span>
        <span className="size">{props.data.Size}</span>
        <span className="mod">{props.data.Mod}</span>
        <span className="platfrom">{props.data.PlatFrom}</span>
        <span className="link">{props.data.Link}</span>
      </div>
      <div className="content">{props.data.content}</div>
      <style jsx>{`
        span {
          display: block;
        }
      `}</style>
    </div>
  );
}
