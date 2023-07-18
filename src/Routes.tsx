import { Routes as Router, Route } from "react-router-dom";
import { LayoutContainer } from "./components/LayoutContainer";
import { Join } from "./pages/Join";
import { About } from "./pages/About";


export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Join />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Router>
  );
};
