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
        <img src={props.data.Image} alt="" className="Banner" />
      </div>
      <div className="info">
        <span className="publish">{props.data.Publish}</span>
        <span className="genre">{props.data.Category}</span>
        <span className="version">{props.data.Version}</span>
        <span className="size">{props.data.Size}</span>
        <span className="mod">{props.data.Mod}</span>
        <span className="platfrom">{props.data.PlatFrom}</span>
        <span className="link">
          {props.data.Link
            ? "https://apkease.com/2019/09/" + props.data.Link
            : ""}
        </span>
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: props.data.Content }}
      ></div>
      <style jsx>{`
        span {
          display: block;
        }
      `}</style>
    </div>
  );
}
