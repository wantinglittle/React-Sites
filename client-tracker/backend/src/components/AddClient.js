import { useEffect, useState } from "react";
import Axios from "axios";
import States from "./data/states.json";
import PhoneInput from "react-phone-number-input/input";
import Select from 'react-select'
import Confirmation from './Confirmation'
import DateFormatter from "./formatters/DateFormatter";
import {validateName, validatePhone, validateDate, invalidDate} from './formValidation/formValidation'
import "./styles/addClient.css";

const AddClient = () => {
  const [client, setClient] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    dueDate: "",
  });

  const [phone, setPhone] = useState("");
  const [deliverable, setDeliverable] = useState("");

  const {
    name,
    address1,
    address2,
    city,
    state,
    zip,
    email,
    dueDate,
  } = client;

const deliverableOptions= [
{label: "1040", value: '1040'},
{label: "1041", value: '1041'},
{label: "1065", value: '1065'},
{label: "1120S", value: '1120S'},
]

  // Error states
  const [nameError, setNameError] = useState(true);
  const [dateError, setDateError] = useState(true);
  const [phoneError, setPhoneError] = useState(false);
  const [formError, setFormError] = useState(true);
  const [showConfMessage, setShowConfMessage] = useState(false);
  const [isDateInvalid, setIsDateInvalid] = useState(false);

  // OnChange Events
  const onChange = (e) => {
    setClient((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    
  };

  const dateChange = (d) => {
    const formattedDate = DateFormatter(d.target.value)
    setClient((prev) => ({
      ...prev,
      dueDate: formattedDate 
  }))
  }

  const changeDeliverable = (e) => {
    setDeliverable(e.value)
  }

  // Submitting new client to database
  const onClick = (e) => {
    e.preventDefault();
    Axios.post("/clients", {
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
    });
    setShowConfMessage(true)
  };
  
  
  ////////////////Validation
  useEffect(() => {
    setNameError(validateName(name))
    setDateError(validateDate(dueDate))
    setPhoneError(validatePhone(phone))
    setIsDateInvalid(invalidDate(dueDate))
    if (deliverable!=='') setFormError(false)
    
  }, [name, dueDate, phone, deliverable ]);
  

  return (
    <div className="addClientPage">
      <div className="addClientContainer">
        <h1 className="addClientTitle">Add a Client</h1>
        <form className="addClientForm">
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
            onChange={onChange}
          />
          <select
            value={state}
            autoComplete="off"
            name="state"
            id="state"
            className="addClientState"
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
            onChange={onChange}
          />
          <div className="addClientPhoneContainer">
            <p className="labels">
              <label>Phone:</label>
            </p>

            <PhoneInput
              country="US"
              value={phone}
              name="phone"
              maxLength="14"
              id="phone"
              className="addClientPhone"
              onChange={setPhone}
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
                isSearchable={false}
                />
            </div>
            <div>
              <p className="labels">
                <label>Due Date (Required):</label>
              </p>
              <input
                type="text"
                min='0'
                value={dueDate}
                name="dueDate"
                id="dueDate"
                placeholder="mm/dd/yyyy"
                className="addClientDueDate"
                onChange={(d) => dateChange(d)}
              />
              <p className={dueDate && dateError ? "onscreen" : "offscreen"}>
                Date must be in mm/dd/yyyy format
              </p>
              <p className={dueDate && isDateInvalid && !dateError ? "onscreen" : "offscreen"}>
                Date not valid
              </p>
            </div>
          </div>
          <button
            className={nameError || phoneError || formError || dateError ? "addClientButton disabledButton" : "addClientButton"}
            onClick={onClick}
            disabled={nameError || phoneError || formError || dateError ? true : false}
          >
            Add Client
          </button>
        </form>
      </div>
      <Confirmation open={showConfMessage} />
    </div>
  );
};

export default AddClient;
