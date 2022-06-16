import "./styles/spinner.css";

const Spinner = () => {
  return (
    <div className="spinnerContainer">
    <h1 className="spinnerHeading">Loading</h1>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
