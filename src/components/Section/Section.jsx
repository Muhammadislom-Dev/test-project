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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMTkzMjM5LCJpYXQiOjE2ODMxMDY4MzksImp0aSI6IjA4M2UyMzQyMWVkZDQ5MDRhZDE0YjYzY2ZhN2Y3MmY3IiwidXNlcl9pZCI6MjB9.wrcq4jb_-TP0kamtWjndxDEV15Ca_5kK3zKsEKoC8AU";
  // const communityCreateData = JSON.parse(getItem("communityCreate"));
  const [selectedOption, setSelectedOption] = useState({ value: 1, label: 1 });
  const [list, setList] = useState([]);
  // const [itemOffset, setItemOffset] = useState(0);
  // const endOffset = itemOffset + selectedOption.value;
  // const currentItems = list?.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(list?.length / selectedOption.value);
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * selectedOption.value) % list?.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

  useEffect(() => {
    axios
      .get("https://backend.minalappar.se/files/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setList(res?.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(list);

  return (
    <div className="section">
      <div className="container">
        <div className="section-list">
          <label htmlFor="">
            <img  src={SearchIcon} alt="" className="section-img" />
            <input
              type="text"
              placeholder="Search..."
              className="section-input"
            />
            <img src={CloseIcon} alt="" className="section-img" />
          </label>
          <button className="section-btn">SÖK</button>
        </div>
        <SimpleGrid>
          {list?.results?.map((evt) => (
            <SectionCard evt={evt} key={evt.id} />
          ))}
        </SimpleGrid>

        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        /> */}
      </div>
    </div>
  );
}

export default Section;
