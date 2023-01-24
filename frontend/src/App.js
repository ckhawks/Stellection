import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Home from "./containers/Home";
import About from "./containers/About";
import StarDetails from "./containers/StarDetails";
import StarsContainer from "./containers/StarsContainer";
import Layout from "./containers/Layout";
import NotFound from "./components/NotFound";
import ClusterContainer from "./containers/ClusterContainer";
import ClusterDetails from "./containers/ClusterDetails";
import Testing from "./containers/Testing";
import GeistTestContainer from "./containers/GeistTestContainer.jsx";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    // <div className="App">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="stars" element={<StarsContainer />}>
          <Route path=":starId" element={<StarDetails />} />
        </Route>
        <Route path="clusters" element={<ClusterContainer />}>
          <Route path=":clusterId" element={<ClusterDetails />} />
        </Route>
        <Route path="test" element={<Testing />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="geist-test" element={<GeistTestContainer />} />
      <Route path="register" element={<RegisterPage />}/>
    </Routes>
    // </div>
  );
}

export default App;
