import React from "react";
import gambar1 from "@/Assets/s1.png";
import gambar2 from "@/Assets/s2.png";
import gambar3 from "@/Assets/s3.png";
import gambar4 from "@/Assets/s4.png";
import gambar5 from "@/Assets/s5.png";
import gambar6 from "@/Assets/s6.png";
import gambar7 from "@/Assets/s7.png";
import gambar8 from "@/Assets/s8.png";
import gambar9 from "@/Assets/s9.png";
import gambar10 from "@/Assets/s10.png";

const SliderCardItem = ({ gambar, name, merk, price }) => {
    return (
        <div className="">
            <div className="">
                <img
                    src={
                        gambar === 1
                            ? gambar1
                            : gambar === 2
                            ? gambar2
                            : gambar === 3
                            ? gambar3
                            : gambar === 4
                            ? gambar4
                            : gambar === 5
                            ? gambar5
                            : gambar === 6
                            ? gambar6
                            : gambar === 7
                            ? gambar7
                            : gambar === 8
                            ? gambar8
                            : gambar === 9
                            ? gambar9
                            : gambar === 10
                            ? gambar10
                            : gambar === 11
                    }
                    className=""
                    alt="..."
                />
                <div className="text-sm ml-12">
                <p>{name}</p>
                <p>{merk}</p>
                <p>{price}</p>
                </div>
            </div>
        </div>
    );
};

export default SliderCardItem;
