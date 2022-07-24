import { useState, useEffect } from "react";
import("./styles/pagination.css");

function Pagination(props) {
  const data = props.pageData;
  const setPage = props.setPage;

  const [currPage, setCurrPage] = useState(0);
  const [lastPage, setLastPage] = useState();
  const button1 = 1;
  const [button2, setButton2] = useState();
  const [button3, setButton3] = useState();
  const [button4, setButton4] = useState();
  const [button5, setButton5] = useState();
  const [button6, setButton6] = useState();
  const [button7, setButton7] = useState();
  const [button8, setButton8] = useState();

  useEffect(() => {
    setCurrPage(data && data.pagination.currentPage);
    setLastPage(data && data.pagination.totalPages);
    setButton2(currPage - 3);
    setButton3(currPage - 2);
    setButton4(currPage - 1);
    setButton5(currPage + 1);
    setButton6(currPage + 2);
    setButton7(currPage + 3);
    setButton8(lastPage);
  }, [data, currPage, lastPage]);

//   console.log(data)

  return (
    <>
    {lastPage > 1 ? (
    <div className="pagiContainer">
      {currPage !== 1 ? (
      <button
        className="pageButton" 
        onClick={() => setPage(currPage - 1)}
      >
        &#60;
      </button>) :null}
      {currPage !== 1 ? (
        <button className="pageButton" id="smallScreen1" onClick={() => setPage(button1)}>
          {button1}
        </button>
      ) : null}
      {currPage > 4 ? (
        <button className="pageButton pageLinks" onClick={() => setPage(button1)}>
          {button1}
        </button>
      ) : null}

      {currPage > 5 ? <span className="ellipsis">...</span> : null}
      {currPage > 2 ? <span className="ellipsisSS">...</span> : null}

      {button2 > 0 ? (
        <button className="pageButton pageLinks" onClick={() => setPage(button2)}>
          {button2}
        </button>
      ) : null}
      {button3 > 0 ? (
        <button className="pageButton pageLinks" onClick={() => setPage(button3)}>
          {button3}
        </button>
      ) : null}
      {button4 > 0 ? (
        <button className="pageButton pageLinks" onClick={() => setPage(button4)}>
          {button4}
        </button>
      ) : null}
      <button className="currPageButton ">{currPage}</button>
      {button5 - lastPage < 0 ? (
        <button className="pageButton pageLinks" onClick={() => setPage(button5)}>
          {button5}
        </button>
      ) : null}
      {button6 - lastPage < 0 ? (
        <button className="pageButton pageLinks" onClick={() => setPage(button6)}>
          {button6}
        </button>
      ) : null}
      {button7 - lastPage < 0 ? (
        <button className="pageButton pageLinks" onClick={() => setPage(button7)}>
          {button7}
        </button>
      ) : null}

      {currPage - lastPage < -4 ? <span className="ellipsis">...</span> : null}
      {currPage - lastPage < -1 ? <span className="ellipsisSS">...</span> : null}
      {currPage !== lastPage ? (
        <button className="pageButton" onClick={() => setPage(button8)}>
          {button8}
        </button>
      ) : null}
      
      {currPage!==lastPage ? (
      <button
        className="pageButton"
        onClick={() => setPage(currPage + 1)}
      >
        &#62;
      </button>) : null}
    </div>) : null}
    </>
  );
}

export default Pagination;
