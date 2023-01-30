import NavbarMenu from "../components/NavbarMenu/NavbarMenu";
import Login from "../components/Login/Login";
import Footer from "../components/Footer/Footer";

const RegisterPage = (props) => {
  return (
    <>
      <div className="page">
        <NavbarMenu />
        <Login props={props} />
        <Footer />
      </div>
    </>
  );
};

export default RegisterPage;
