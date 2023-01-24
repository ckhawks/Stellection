import NavbarMenu from '../components/NavbarMenu/NavbarMenu';
import Footer from '../components/Footer/Footer';

const WideLayout = (props) => {
    return (
        <>
            <NavbarMenu wide/>
            <div class="main-content">
                <div class="container-wide">
                    <h2>WIDE</h2>
                    {props.children}
                </div>
            </div>
            
            <Footer wide/>
        </>
    );

}

export default WideLayout;