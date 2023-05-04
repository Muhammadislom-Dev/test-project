import React, { useEffect, useState } from "react";
import "./Section.css";
import SearchIcon from "../../assets/icons/search.png";
import CloseIcon from "../../assets/icons/close.png";
import { SimpleGrid } from "@chakra-ui/react";
import SectionCard from "./SectionCard";
import ReactPaginate from "react-paginate";
import axios from "axios";

function Section() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMjgyNDU2LCJpYXQiOjE2ODMxOTYwNTYsImp0aSI6ImRhMjA3Nzc0NDA4OTRjM2RiMTJmZWI0ZDVmOWY2YmFkIiwidXNlcl9pZCI6MjB9._34p8O5M30wd3tlwjW8J9JBJnDC66J_jzav2uEJkrRk";
  const [selectedOption, setSelectedOption] = useState({ value: 1, label: 1 });
  const [list, setList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [select, setSelect] = useState("");
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
        setList(res?.data);
        setFilterData(
          res?.data?.results?.filter((evt) => evt?.organ === select)
        );
      })
      .catch((err) => console.log(err));
  }, [select]);

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
            />
            <img src={CloseIcon} alt="" className="section-img" />
          </label>
          <button className="section-btn">SÖK</button>
        </div>
        <select
          onChange={(e) => setSelect(e.target.value)}
          className="section-select">
          <option value="kommunstyrelsen">Kommunstyrelsen</option>
          <option value="kommunfullmäktige">Kommunfullmäktige</option>
        </select>
        <p>{list.count}</p>
        <SimpleGrid>
          {select === ""
            ? list?.results?.map((evt) => (
                <SectionCard evt={evt} key={evt.id} />
              ))
            : filterData?.map((evt) => <SectionCard evt={evt} key={evt.id} />)}
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
