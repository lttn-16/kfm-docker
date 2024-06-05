import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import List from "./pages/List";

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<List />}
        />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
