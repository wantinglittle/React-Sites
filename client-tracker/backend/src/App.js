import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddClient from "./components/AddClient";
import SearchClients from "./components/SearchClients";
import SelectedClient from "./components/SelectedClient.js";
import DueDateReport from "./components/DueDateReport";
import Header from "./components/Header.js";
// import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";
import "./App.css";

function App() {
  // const { isLoading } = useAuth0();
  // if (isLoading) {
  //   // return <Loading />;
  // }
  return (
    <main className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<SearchClients />} />
          <Route path="/duedatereport" element={<DueDateReport />} />
          <Route path="/addclient" element={<AddClient />} />
          <Route path="/selectedclient" element={<SelectedClient />} />
          <Route
            path="/editclient"
            element={<ProtectedRoute component={SelectedClient} />}
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
