import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Welcome from "./pages/Welcome";
import PrivateRoute from "./PrivateRoute";
import List from "./pages/List";

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/welcome"
          element={<PrivateRoute element={<Welcome />} />}
        />
        <Route
          path="/list"
          element={<PrivateRoute element={<List />} />}
        />
        <Route exact path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
