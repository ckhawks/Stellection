import NavbarMenu from '../components/NavbarMenu/NavbarMenu';
import Footer from '../components/Footer/Footer';

const BaseLayout = (props) => {
    return (
        <>
            <NavbarMenu wide={props.wide}/>
            <div class="main-content">
                <div class={(props.wide ? "container-wide " : "container-regular ") + (props.centered ? "vertical-center" : "")}>
                    {props.children}
                </div>
            </div>
            <Footer wide={props.wide}/>
            
        </>
    );

}

export default BaseLayout;