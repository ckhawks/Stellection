import NavbarMenu from "../components/NavbarMenu/NavbarMenu";
import Footer from "../components/Footer/Footer";

import { Outlet } from "react-router";

const BaseLayout = (props) => {
  return (
    <>
      <NavbarMenu wide={props.wide} />
      <div className="main-content">
        <div
          className={
            (props.wide ? "container-wide " : "container-regular ") +
            (props.centered ? "vertical-center" : "")
          }
        >
          <Outlet />
          {/* {props.children} */}
        </div>
      </div>
      <Footer wide={props.wide} />
      {props.centerBackground && (
        <div className={"center-bg-wrapper"}>
          <div className="center-bg-wrapper-inner">
            <div className={"center-bg"} />
          </div>
        </div>
      )}
    </>
  );
};

export default BaseLayout;
