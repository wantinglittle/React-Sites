import { useState, useEffect } from "react";
import Axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import States from "./data/states.json";
import PhoneInput from "react-phone-number-input/input";
import { Link } from "react-router-dom";
import Select from "react-select";
import DateFormatter from "./formatters/DateFormatter";
import {
  validateName,
  validatePhone,
  validateDate,
} from "./formValidation/formValidation";
import "./styles/addClient.css";

const SelectedClient = (props) => {
  const location = useLocation();
  const [edit, setEdit] = useState(false);
  const id = location.state.id;
  const database = location.state.database;
  const index = database.findIndex((x) => x._id === id);
  const { isAuthenticated } = useAuth0();

  const [client, setClient] = useState({
    clientid: database[index]._id,
    name: database[index].name,
    address1: database[index].address1,
    address2: database[index].address2,
    city: database[index].city,
    state: database[index].state,
    zip: database[index].zip,
    phone: database[index].phone,
    email: database[index].email,
    deliverable: database[index].deliverable,
    dueDate: database[index].dueDate,
  });

  const {
    // clientid,
    name,
    address1,
    address2,
    city,
    state,
    zip,
    phone,
    email,
    deliverable,
    dueDate,
  } = client;

  const deliverableOptions = [
    { label: "1040", value: "1040" },
    { label: "1041", value: "1041" },
    { label: "1065", value: "1065" },
    { label: "1120S", value: "1120S" },
  ];

  const [newPhone, setNewPhone] = useState(phone);
  const [newDeliverable, setNewDeliverable] = useState(deliverable);

  // Error states
  const [nameError, setNameError] = useState(true);
  const [dateError, setDateError] = useState(true);
  const [phoneError, setPhoneError] = useState(false);

  const onChange = (e) => {
    setClient((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dateChange = (d) => {
    const formattedDate = DateFormatter(d.target.value);
    setClient((prev) => ({
      ...prev,
      dueDate: formattedDate,
    }));
  };

  const changeDeliverable = (e) => {
    setNewDeliverable(e.value);
  };

  useEffect(() => {
    setClient((prev) => ({
      ...prev,
      phone: newPhone,
      deliverable: newDeliverable,
    }));
  }, [newPhone, newDeliverable]);

  const editClient = (e) => {
    e.preventDefault();
    Axios.put("/updateclient", { id, client });
    setEdit(false);
  };

  const toggleEdit = () => {
    setEdit(true);
  };

  ////////////////Validation
  useEffect(() => {
    setNameError(validateName(name));
    setDateError(validateDate(dueDate));
    setPhoneError(validatePhone(phone));
  }, [name, dueDate, phone, deliverable]);

  return (
    <div className="addClientPage">
      <div className="addClientContainer">
        <h1 className="addClientTitle">Edit Client</h1>
        <form>
          <p className="labels">
            <label>Name (Required):</label>
          </p>
          <input
            autoFocus
            autoComplete="off"
            type="text"
            value={name}
            name="name"
            id="name"
            required
            maxLength={40}
            className="inputFull"
            readOnly={edit ? false : true}
            onChange={onChange}
          />
          <p className={name && nameError ? "onscreen" : "offscreen"}>
            Name must be at least 4 characters
          </p>
          <p className="labels">
            <label>Address:</label>
          </p>
          <input
            type="text"
            autoComplete="off"
            value={address1}
            name="address1"
            id="address1"
            maxLength={40}
            placeholder="Street address"
            className="inputFull"
            readOnly={edit ? false : true}
            onChange={onChange}
          />
          <input
            type="text"
            autoComplete="off"
            value={address2}
            name="address2"
            id="address2"
            maxLength={40}
            placeholder="Apartment, suite, etc."
            className="inputFull"
            readOnly={edit ? false : true}
            onChange={onChange}
          />
          <input
            type="text"
            autoComplete="off"
            value={city}
            name="city"
            id="city"
            maxLength={40}
            placeholder="City"
            className="addClientCity"
            readOnly={edit ? false : true}
            onChange={onChange}
          />
          <select
            value={state}
            autoComplete="off"
            name="state"
            id="state"
            className="addClientState"
            disabled={edit ? false : true}
            onChange={onChange}
          >
            {" "}
            {States.map((state) => {
              return (
                <option value={state} key={state}>
                  {state}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            autoComplete="off"
            value={zip}
            name="zip"
            id="zip"
            placeholder="Zip Code"
            maxLength={5}
            className="addClientZip"
            readOnly={edit ? false : true}
            onChange={onChange}
          />
          <div className="addClientPhoneContainer">
            <p className="labels">
              <label>Phone:</label>
            </p>

            <PhoneInput
              country="US"
              value={newPhone}
              name="phone"
              maxLength="14"
              id="phone"
              className="addClientPhone"
              readOnly={edit ? false : true}
              onChange={setNewPhone}
            />
            <p className={phone && phoneError ? "onscreen" : "offscreen"}>
              Invalid phone number
            </p>
          </div>
          <div className="addClientEmailContainer">
            <p className="labels">
              <label>E-mail:</label>
            </p>
            <input
              type="email"
              autoComplete="off"
              value={email}
              name="email"
              id="email"
              className="addClientEmail"
              readOnly={edit ? false : true}
              onChange={onChange}
            />
          </div>
          <div className="deliverableContainer">
            <div>
              <p className="labels">
                <label>Deliverable (Required):</label>
              </p>
              <Select
                options={deliverableOptions}
                className="addClientDeliverable"
                onChange={changeDeliverable}
                placeholder={newDeliverable}
                isDisabled={edit ? false : true}
                isSearchable={false}
              />
            </div>
            <div>
              <p className="labels">
                <label>Due Date (Required):</label>
              </p>
              <input
                type="text"
                min="0"
                value={dueDate}
                name="dueDate"
                id="dueDate"
                className="addClientDueDate"
                readOnly={edit ? false : true}
                onChange={(d) => dateChange(d)}
              />
              <p className={dueDate && dateError ? "onscreen" : "offscreen"}>
                Date must be in mm/dd/yyyy format
              </p>
            </div>
          </div>
        </form>
        <div className="editSaveButtonContainer">
          <p
            className={
              !isAuthenticated ? "onscreen needToBeLoggedIn" : "offscreen"
            }
          >
            You must be logged in to edit clients. Clicking 'Edit' will redirect
            you to the login page.
          </p>
          <Link
            to="/editclient"
            state={{ database: database, id: id }}
          >
            <button
              className={
                edit ? "addClientButton disabledButton" : "addClientButton"
              }
              onClick={toggleEdit}
              disabled={edit ? true : false}
            >
              Edit
            </button>
          </Link>
          <button
            className={
              !edit ? "addClientButton disabledButton" : "addClientButton"
            }
            onClick={editClient}
            disabled={
              !edit || nameError || phoneError || dateError ? true : false
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedClient;
