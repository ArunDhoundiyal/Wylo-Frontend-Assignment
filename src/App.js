import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UseContext";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import UserDetail from "./components/UserDetail";
import Update from "./components/Update";
import "./App.css";

const App = () => (
  <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/user-detail" element={<UserDetail />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </Router>
  </UserProvider>
);

export default App;
