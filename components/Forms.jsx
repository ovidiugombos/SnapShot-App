import React from "react";
import ImgContext from "../ContextAPI/ImgContext";
import DisplayImages from "./DisplayImages";
import Pagination from "./Pagination";
export default function Forms() {
  const [imgKeyword, setImgKeyword] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const inputRef = React.useRef(null);

  function filterImages(e) {
    e.preventDefault();
    inputRef.current.value = "";
    setImgKeyword(e.target.value);
    setCurrentPage(1);
  }

  function changeCurrentPage(pageNumer) {
    setCurrentPage(pageNumer);
  }

  function inputKeyword(e) {
    if (e.key === "Enter") {
      e.target.blur();
      setImgKeyword(e.target.value);
    }
  }

  return (
    <div>
      <div className="forms">
        <input
          ref={inputRef}
          onKeyDown={inputKeyword}
          className="forms--input"
          type="text"
          placeholder="Search an image!"
        />
        <div className="forms--btns">
          <button onClick={filterImages} value="Nature" className="btn">
            Nature
          </button>
          <button onClick={filterImages} value="Art" className="btn">
            Art
          </button>
          <button onClick={filterImages} value="Puppies" className="btn">
            Puppies
          </button>
          <button onClick={filterImages} value="Cars" className="btn">
            Cars
          </button>
        </div>
      </div>
      {imgKeyword && (
        <ImgContext.Provider value={imgKeyword}>
          <DisplayImages
            currentPage={currentPage}
            changeCurrentPage={changeCurrentPage}
          />
        </ImgContext.Provider>
      )}
      {imgKeyword && <Pagination changeCurrentPage={changeCurrentPage} />}
    </div>
  );
}
