import React, { useEffect, useState } from "react";
import "./Section.css";
import SearchIcon from "../../assets/icons/search.png";
import CloseIcon from "../../assets/icons/close.png";
import { Button, SimpleGrid } from "@chakra-ui/react";
import SectionCard from "./SectionCard";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { data } from "../data";

function Section() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzODY5NzQ4LCJpYXQiOjE2ODM3ODMzNDgsImp0aSI6IjEyYTkyNjI0MTViNDQ4YzVhZDA3ZDI0NDI1NzMwMDc1IiwidXNlcl9pZCI6MjB9.5Le4pIM7iy2z7X9lAtztYOvMSp6UB1bzC8BD0wuTb-c";
  const [selectedOption, setSelectedOption] = useState({ value: 1, label: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState([]);
  const [district, setDistrict] = useState("");
  const [select, setSelect] = useState("");
  const [region, setRegion] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const pageCount = Math.ceil(list?.count / selectedOption.value);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * selectedOption.value) % list?.count;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    axios
      .get("https://backend.minalappar.se/files/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setList(res?.data?.results);
      })
      .catch((err) => console.log(err));
  }, []);

  function highlightSearchQuery(str) {
    const re = new RegExp(searchQuery, "gi");
    const matches = str.match(re);
    if (!matches) {
      return str;
    }
    const parts = str.split(re);
    return parts.flatMap((part, index) => {
      if (index < parts.length - 1) {
        return [
          part,
          <span key={index} className="highlight">
            {matches[index]}
          </span>,
        ];
      } else {
        return [part];
      }
    });
  }

  const handleReset = () => {
    setRegion("");
    setDistrict("");
    setSelect("");
  };

  const filterDistrict = data?.find((evt) => evt?.country === district);

  const filterDataOne = () => {
    let filteredData = list;

    if (select) {
      filteredData = list?.filter((evt) => evt?.organ === select);
    }
    if (district) {
      filteredData = list?.filter((evt) => evt?.country === district);
    }
    if (region) {
      filteredData = list?.filter((evt) => evt?.region === region);
    }
    return filteredData;
  };

  const filteredData = filterDataOne();

  return (
    <div className="section">
      <div className="container">
        <div className="section-list">
          <label htmlFor="">
            <img src={SearchIcon} alt="" className="section-img" />
            <input
              type="text"
              placeholder="Search..."
              className="section-input"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <img src={CloseIcon} alt="" className="section-img" />
          </label>
          <button className="section-btn">SÖK</button>
        </div>
        <select
          value={select}
          onChange={(e) => setSelect(e.target.value)}
          className="section-select">
          <option value="">All</option>
          <option value="kommunstyrelsen">Kommunstyrelsen</option>
          <option value="kommunfullmäktige">Kommunfullmäktige</option>
        </select>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="section-select"
          name=""
          id="">
          {data?.map((evt) => (
            <option key={evt.id} value={evt.country}>
              {evt.country}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setRegion(e.target.value)}
          className="section-select"
          name=""
          id="">
          {filterDistrict?.regions?.map((evt) => (
            <option key={evt.id} value={evt.region}>
              {evt.region}
            </option>
          ))}
        </select>
        <Button {...css.button} onClick={handleReset}>
           Delete
        </Button>
        <p>{list.count}</p>
        <SimpleGrid>
          {filteredData?.map((evt) => (
            <SectionCard
              highlightSearchQuery={highlightSearchQuery}
              evt={evt}
              key={evt.id}
            />
          ))}
        </SimpleGrid>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          subContainerClassName="pages"
          breakLinkClassName="page_link"
          containerClassName="pagination"
          pageClassName="page_item"
          pageLinkClassName="page_link"
          previousClassName="page_item"
          previousLinkClassName="page_link"
          nextClassName="page_item"
          nextLinkClassName="page_link"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default Section;

const css = {
  button: {
    background: "#FFDA3A",
    borderRadius: "10px",
    width: "131px",
    height: "34px",
    border: "none",
    cursor: "pointer",
  },
};
