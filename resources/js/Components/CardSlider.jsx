import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderCardItem from "./SliderCardItem";

const CardSlider = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
        },
        desktop: {
            breakpoint: { max: 1023, min: 800 },
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 799, min: 464 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 463, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
        >
            <div className="mx-1">
                <SliderCardItem
                    gambar={1}
                    name={"Adidas ADIZERO SL Men "}
                    merk={"ADIDAS"}
                    price={"$1M"}
                />
            </div>
            <div className="mx-1">
                <SliderCardItem
                    gambar={2}
                    name={"Converse Chuck 70 "}
                    merk={"Adidas"}
                    price={"Rp500.000"}
                />
            </div>
            <div className="mx-1">
                <SliderCardItem 
                gambar={3} 
                name={"Adidas Ultrabounce Men's  "}
                    merk={"Adidas"}
                    price={"Rp500.000"}
                />
            </div>
            <div className="mx-1">
                <SliderCardItem 
                gambar={4}
                name={"Reebok Glide Men "}
                    merk={"Reebok"}
                    price={"Rp500.000"}
                    />
            </div>
            <div className="mx-1">
                <SliderCardItem 
                gambar={5} 
                name={"ASICS GT 2000 11 WIDE MEN'S "}
                    merk={"Asics"}
                    price={"Rp500.000"}
                />
            </div>
            <div className="mx-1">
                <SliderCardItem 
                gambar={6}
                name={"Nike Pegasus 40 Women's"}
                    merk={"Nike"}
                    price={"Rp500.000"}
                />
            </div>
            <div className="mx-1">
                <SliderCardItem 
                gambar={7} 
                name={"Lacoste Men's T-Clip Tricolour"}
                    merk={"Lacoste"}
                    price={"Rp500.000"}
                />
            </div>
            <div className="mx-1">
                <SliderCardItem 
                gambar={8} 
                name={"Diadora Hawa Men's "}
                    merk={"Diadora"}
                    price={"Rp500.000"}
                />
            </div>
            <div className="mx-1">
                <SliderCardItem 
                gambar={9} 
                name={"DIADORA TORNEO MEN'S"}
                    merk={"Diadora"}
                    price={"Rp500.000"}
                />
            </div>
            <div className="mx-1">
                <SliderCardItem 
                gambar={10}
                name={"Reebok Glide Men"}
                    merk={"Reebok"}
                    price={"Rp500.000"}
                />
            </div>
        </Carousel>
    );
};

export default CardSlider;
