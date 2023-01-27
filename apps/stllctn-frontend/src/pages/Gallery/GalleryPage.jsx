import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Text, Spacer, Image, Slider } from '@geist-ui/core';
import { useState } from "react";

import './GalleryPage.css';
import { useEffect } from "react";

function importAll(r){
    return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/test-images', false, /\.(png|jpe?g|svg|webp)$/));

const ImageBlock = (props) => {
    // add slider to control ResponsiveMasonry columnsCountBreakPoints
    return (
        <div className="gallery-image-wrapper">
            <Image className="gallery-image" height={props.height || "100%"} src={props.image_url} alt={"fuck you not blind people"} style={{objectFit: "inherit"}}/>
            <div className="gallery-image-overlay"><Text h4 mb={0}>{props.image_url.replace("/static/media/", "")}</Text></div>
        </div>
        
    );
}

const columnBreakpointsKey = [{
    0: 1,
    1000: 2,
    2000: 3,
    3000: 4,
    4000: 5
}, {
    0: 1,
    700: 2,
    1300: 3,
    2000: 4,
    2700: 5,
    3400: 6,
    4000: 7
}, {
    0: 1,
    700: 2,
    1300: 3,
    1800: 4,
    2100: 5,
    2500: 6,
    3000: 7,
    3500: 8
}, {
    0: 2,
    1100: 3,
    1500: 4,
    1900: 5,
    2300: 6,
    2700: 7,
    3100: 8,
    3500: 9
}]

const GalleryPage = () => {
    const [sliderValue, setSliderValue] = useState(3);
    const [columnsCountBreakPointsDynamic, setColumnsCountBreakPointsDynamic] = useState(columnBreakpointsKey[sliderValue - 1]);

    const galleryBreakpointSliderHandler = (value) => {
        setSliderValue(value);
    }

    useEffect(() => {
        setColumnsCountBreakPointsDynamic(columnBreakpointsKey[sliderValue - 1]);
        // console.log(columnsCountBreakPointsDynamic);
    }, [sliderValue]);

    return (
        <>
                
            <Text h1>Gallery</Text>
            <Text>Image density: Low  <Spacer inline w={3}/>      High</Text>
            <Slider value={sliderValue} onChange={galleryBreakpointSliderHandler} step={1} max={4} min={1} initialValue={3} showMarkers hideValue width="200px" />
            <Spacer/>
            
            <ResponsiveMasonry
                columnsCountBreakPoints={columnsCountBreakPointsDynamic}// +400
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