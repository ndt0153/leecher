import React, { Component } from "react";
import Link from "next/link";
import "../index.css";
import fetch from "isomorphic-unfetch";
export default class Page extends Component {
  constructor() {
    super();
    this.state = {
      pager: {},
      data: []
    };
  }
  static async getInitialProps(context) {
    try {
      const { id } = context.query;
      const page = (await parseInt(id)) || 1;
      const res = await fetch(`http://localhost:2000/page?page=${page}`);
      const data = await res.json();
      return { data };
    } catch (e) {
      console.log(e);
    }
  }
  componentDidMount() {
    this.setState({ data: this.props.data.data, pager: this.props.data.pager });
  }
  loadPage = () =>
    this.props.data.pager.pages.map((value, key) => (
      <a
        className={`${
          this.props.data.pager.currentPage === value ? "active" : ""
        }`}
        key={key}
        href={`/?page=${value}`}
      >
        {value}
      </a>
    ));
  render() {
    const { pager, data } = this.props.data;
    console.log(this.props.data);
    return (
      <div className="home">
        <h3>APK Toi co</h3>
        <div className="card-body">
          {data.map(item => (
            <a href={`/apk/${item.id}`} key={item.id} className="apk">
              {item.Title}
            </a>
          ))}
        </div>
        <div className="card-footer">
          {pager.currentPage === 1 ? (
            ""
          ) : (
            <a href={`/?page=${pager.currentPage - 1}`}>
              <span className="back">Lùi</span>
            </a>
          )}

          {pager.pages ? this.loadPage() : ""}
          {pager.currentPage === pager.totalPages ? (
            ""
          ) : (
            <a href={`/?page=${pager.currentPage + 1}`}>
              <span className="back">Tới</span>
            </a>
          )}
        </div>
      </div>
    );
  }
}
