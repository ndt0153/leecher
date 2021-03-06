import React, { Component } from "react";
import Link from "next/link";
import "../index.css";
import fetch from "isomorphic-unfetch";
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      pager: {},
      data: []
    };
  }
  static async getInitialProps(params) {
    try {
      const id = params;
      console.log(id);
      //const params = new URLSearchParams(search);
      const page = parseInt() || 1;

      fetch(`http://localhost:2000/page?page=${page}`, { method: "GET" })
        .then(res => res.json())
        .then(({ pager, data }) => {
          console.log("fix");
        });
    } catch (e) {
      console.log(e);
    }
  }

  loadPage = () =>
    this.state.pager.pages.map((value, key) => (
      <a
        className={`${this.state.pager.currentPage === value ? "active" : ""}`}
        key={key}
        href={`/?page=${value}`}
      >
        {value}
      </a>
    ));
  render() {
    const { pager, data } = this.state;

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
