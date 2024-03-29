import { BrowserRouter, Routes, Route } from "react-router-dom"; // Link

// legacy
import Home from "../containers/Legacy/Home";
import About from "../containers/Legacy/About";
import StarDetails from "../containers/Legacy/StarDetails";
import StarsContainer from "../containers/Legacy/StarsContainer";
import Layout from "../containers/Legacy/Layout";
import NotFound from "../components/Legacy/NotFound";
import ClusterContainer from "../containers/Legacy/ClusterContainer";
import ClusterDetails from "../containers/Legacy/ClusterDetails";
import Testing from "../containers/Legacy/Testing";

// NEW AGE
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import HomePage from "../pages/Home/HomePage";
import GeistTestPage from "../pages/GeistTest/GeistTestPage";
import LoginPage from "../pages/Authentication/LoginPage";
import LogoutPage from "../pages/Authentication/LogoutPage";
import RegisterPage from "../pages/Authentication/RegisterPage";
import BrowsePage from "../pages/Browse/BrowsePage";
import GalleryPage from "../pages/Gallery/GalleryPage";
import OrganizePage from "../pages/Organize/OrganizePage";
import CollectPage from "../pages/Collect/CollectPage";
import SingleStarPage from "../pages/Star/SingleStarPage";
import SingleClusterPage from "../pages/Cluster/SingleClusterPage";

import BaseLayout from "../pages/BaseLayout";
import Page from "../pages/Page";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* could also refactor to use loaders to preload data for the route https://reactrouter.com/en/main/route/loader */}
          {/* could refactor this to use contexts to inform the layout https://reactjs.org/docs/context.html */}

          <Route element={<BaseLayout />}>
            <Route
              path="*"
              element={<Page title="Not Found" children={<NotFoundPage />} />}
            />
            <Route
              path="/"
              element={<Page title="Home" children={<HomePage />} />}
            />
            <Route
              path="geist-test"
              element={
                <Page title="Geist Testing" children={<GeistTestPage />} />
              }
            />
            <Route
              path="collect"
              element={<Page title="Collect" children={<CollectPage />} />}
            />
            {/* <Route
              path="browse"
              element={<Page title="Browse" children={<BrowsePage />} />}
            /> */}
            <Route path="clusters">
              <Route
                index
                element={
                  <Page
                    title="Browse: Clusters"
                    children={<BrowsePage viewing="clusters" />}
                  />
                }
              />
              <Route
                path=":clusterId"
                element={
                  <Page title="Cluster" children={<SingleClusterPage />} />
                }
              />
            </Route>
            <Route path="stars">
              <Route
                path=""
                element={
                  <Page
                    title="Browse: Stars"
                    children={<BrowsePage viewing="stars" />}
                  />
                }
              />
              <Route
                path=":starId"
                element={<Page title="Star" children={<SingleStarPage />} />}
              />
            </Route>
          </Route>

          <Route element={<BaseLayout centered centerBackground />}>
            <Route
              path="login"
              element={<Page title="Login" children={<LoginPage />} />}
            />
            <Route
              path="register"
              element={<Page title="Register" children={<RegisterPage />} />}
            />
            {/* <Route
              path="logout"
              element={<Page title="Logout" children={<LogoutPage />} />}
            /> */}
          </Route>

          <Route element={<BaseLayout wide />}>
            <Route
              path="gallery"
              element={<Page title="Gallery" children={<GalleryPage />} />}
            />
            <Route
              path="organize"
              element={<Page title="Organize" children={<OrganizePage />} />}
            />
          </Route>

          {/* Legacy routes */}
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
