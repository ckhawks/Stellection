import { BrowserRouter, Routes, Route } from "react-router-dom"; // Link

import "./App.css";

// legacy
import Home from "./containers/Legacy/Home";
import About from "./containers/Legacy/About";
import StarDetails from "./containers/Legacy/StarDetails";
import StarsContainer from "./containers/Legacy/StarsContainer";
import Layout from "./containers/Legacy/Layout";
import NotFound from "./components/Legacy/NotFound";
import ClusterContainer from "./containers/Legacy/ClusterContainer";
import ClusterDetails from "./containers/Legacy/ClusterDetails";
import Testing from "./containers/Legacy/Testing";

// NEW AGE
import NotFoundPage from './pages/NotFound/NotFoundPage';
import HomePage from './pages/Home/HomePage';
import GeistTestPage from './pages/GeistTest/GeistTestPage';
import LoginPage from './pages/Authentication/LoginPage';
import RegisterPage from "./pages/Authentication/RegisterPage";
import GalleryPage from "./pages/Gallery/GalleryPage";


function App() {
  return (
        
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage/>} /> 
          <Route path="/" element={<HomePage/>} />
          <Route path="/geist-test" element={<GeistTestPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="register" element={<RegisterPage />}/>
          <Route path="/gallery" element={<GalleryPage/>}/>

          <Route path="old" element={<Layout />}>
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
          {/* <Route path="/" element={<Layout />}>
            
          </Route>
          <Route path="geist-test" element={<GeistTestContainer />} />
          <Route path="register" element={<RegisterPage />}/>
          <Route path="gallery" element={<GalleryPage/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
