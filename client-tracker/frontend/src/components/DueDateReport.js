import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import DateFormatter from "./formatters/DateFormatter";
import { validateDate, invalidDate } from "./formValidation/formValidation";
import "./styles/searchClients.css";

const DueDateReport = () => {
  const [reportDate, setReportDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dateError, setDateError] = useState(true);
  const [isDateInvalid, setIsDateInvalid] = useState(false);

  const dateChange = (d) => {
    const formattedDate = DateFormatter(d.target.value);
    setReportDate(formattedDate);
  };

  /// Run Report
  const onClick = (e) => {
      e.preventDefault()
    let rdYear=parseInt(reportDate.slice(6,10))
    let rdMonth=parseInt(reportDate.slice(0,2))
    let rdDay=parseInt(reportDate.slice(3,5))
    e.preventDefault();
    Axios.get("/getclients").then((res) => {
      setSearchResults(
        res.data.filter((clients) => {
          return parseInt(clients.dueDate.slice(6,10)) <= rdYear &&
          parseInt(clients.dueDate.slice(0,2)) <= rdMonth &&
          parseInt(clients.dueDate.slice(3,5)) <= rdDay
        }).sort((a,b) => {
            let da = new Date(a.dueDate)
            let db = new Date(b.dueDate)
            return da-db
        })
      );

    });
  };

  //Validation
  useEffect(() => {
    setDateError(validateDate(reportDate));
    setIsDateInvalid(invalidDate(reportDate));
  }, [reportDate]);


  return (
    <div className="dueDateSearchContainer">
      <form className="dueDateSearchForm">
        <p className="labels">
          <label>Enter Date and Run Report:</label>
        </p>
        <div className="dueDateSearchInputAndButton">
          <input
            type="text"
            min="0"
            value={reportDate}
            name="dueDate"
            id="dueDate"
            placeholder="mm/dd/yyyy"
            className="dueDateSearchInput"
            onChange={(d) => dateChange(d)}
          />
                    <button className="searchButton" onClick={onClick}>
            Run Report
          </button>



        </div>
        <p className={reportDate && dateError ? "onscreen" : "offscreen"}>
            Date must be in mm/dd/yyyy format
          </p>
          <p
            className={
              reportDate && isDateInvalid && !dateError
                ? "onscreen"
                : "offscreen"
            }
          >
            Date not valid
          </p>
      </form>


      <div className="searchResults">
        {searchResults.map((clients) => {
          return (
            <Link
              to="/selectedclient"
              state={{ database: searchResults, id: clients._id, edit: false }}
              key={clients._id}
            >
              <ul className="resultItemDD" key={clients._id}>
                <li className="srClientName">
                  {clients.name.slice(0, 30)}
                  {clients.name.length > 30 ? "..." : null}
                </li>
                <li className="srClientDeliverable">{clients.deliverable}</li>
                <li className="srClientDueDate">
                  {new Date(clients.dueDate).toString().slice(4, 16)}
                </li>
              </ul>
            </Link>
          );
        }).sort(searchResults.dueDate)}
      </div>
    </div>
  );
};

export default DueDateReport;
