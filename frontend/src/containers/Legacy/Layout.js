import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
          <h1>Stellection</h1>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="about">About</Link> |{" "}
            <Link to="stars">Stars</Link> |{" "}
            <Link to="clusters">Clusters</Link>
          </nav>
          <div className="content">
            <Outlet />
          </div>
        </div>
    );
}

export default Layout;