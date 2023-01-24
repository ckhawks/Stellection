import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Text, Spacer } from '@geist-ui/core';

import NavbarMenu from "../../components/NavbarMenu/NavbarMenu";
import Footer from '../../components/Footer/Footer';

import './GalleryPage.css';
import BaseLayout from "../BaseLayout"

function importAll(r){
    return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/test-images', false, /\.(png|jpe?g|svg|webp)$/));

const ImageBlock = (props) => {
    return (
        <div className="gallery-image-wrapper">
            <img className="gallery-image" height={props.height || "100%"} src={props.image_url} alt={"fuck you not blind people"}/>
            <div className="gallery-image-overlay"><Text h4 mb={0}>{props.image_url.replace("/static/media/", "")}</Text></div>
        </div>
        
    );
}

const GalleryPage = () => {
    return (
        <>
            <BaseLayout wide>
                 
            <Text h1>Gallery</Text>
            <Spacer/>
            
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry gutter="20px">
                    {images.map((image, id) => 
                        <ImageBlock key={image.toString()} image_url={image}/>
                    )}
                </Masonry>
            </ResponsiveMasonry>

            </BaseLayout>
        </>
    );
}

export default GalleryPage;