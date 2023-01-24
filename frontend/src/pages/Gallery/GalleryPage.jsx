import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Text, Spacer, Image } from '@geist-ui/core';

import './GalleryPage.css';

function importAll(r){
    return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/test-images', false, /\.(png|jpe?g|svg|webp)$/));

const ImageBlock = (props) => {
    return (
        <div className="gallery-image-wrapper">
            <Image className="gallery-image" height={props.height || "100%"} src={props.image_url} alt={"fuck you not blind people"} style={{objectFit: "inherit"}}/>
            <div className="gallery-image-overlay"><Text h4 mb={0}>{props.image_url.replace("/static/media/", "")}</Text></div>
        </div>
        
    );
}

const GalleryPage = () => {
    return (
        <>
                
            <Text h1>Gallery</Text>
            <Spacer/>
            
            <ResponsiveMasonry
                columnsCountBreakPoints={{ // TODO make this dynamically generated using a user-controlled slider O_O
                    350:  1, // +400
                    750:  2, // +450
                    1200: 3, // +500
                    1700: 4, // +400
                    2100: 5, // +400
                    2600: 6, // +500
                    3000: 7}}// +400
            >
                <Masonry gutter="20px">
                    {images.map((image, id) => 
                        <ImageBlock key={image.toString()} image_url={image}/>
                    )}
                </Masonry>
            </ResponsiveMasonry>
        </>
    );
}

export default GalleryPage;