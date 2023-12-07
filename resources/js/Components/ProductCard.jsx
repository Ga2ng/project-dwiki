import React from "react";
import sepatu from "@/Assets/8.jpg";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";

const ProductCard = ({
    user,
    harga,
    brand,
    image,
    desc,
    openForm,
    clicked,
    idValue,
    allValue,
    tipe,
    kategori,
    // clickedBuy,
    // onSelectSize,
}) => {

    //notif
    const [isNotifFalse, setisNotifFalse] = useState(false);
    useEffect(() => {
        if (isNotifFalse) {
            const timer = setTimeout(() => {
                setisNotifFalse(false); // Setelah 2-3 detik, hilangkan notifikasi
            }, 3000); // 2000 milidetik = 2 detik, sesuaikan dengan kebutuhan Anda

            return () => {
                clearTimeout(timer); // Bersihkan timer jika komponen di-unmount
            };
        }
    }, [isNotifFalse]);

    const [selectedSize, setSelectedSize] = useState(null);

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const [isNotifTrue, setisNotifTrue] = useState(false);
    useEffect(() => {
        if (isNotifTrue) {
            const timer = setTimeout(() => {
                setisNotifTrue(false); // Setelah 2-3 detik, hilangkan notifikasi
            }, 5000); // 2000 milidetik = 2 detik, sesuaikan dengan kebutuhan Anda

            return () => {
                clearTimeout(timer); // Bersihkan timer jika komponen di-unmount
            };
        }
    }, [isNotifTrue]);

    // console.log(idValue)
    const handleDelete = () => {
        console.log("delete Value", idValue);

        router.delete(`product/${idValue}`, {
            onSuccess: () => {
                console.log("berhasil di hapus");
                window.location.href = "/product";
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    const handleAddCart = () => {
        // Memastikan bahwa ukuran yang dipilih tidak boleh null
        if (selectedSize !== null) {
            setisNotifTrue(true);
            console.log("all value", allValue, user);
            router.post(
                "/cart",
                {
                    product_id: allValue.id,
                    user_id: user.id,
                    size: selectedSize,
                },
                {
                    onSuccess: () => {
                        console.log("succes add to cart");
                        // window.location.href = "/cart";
                    },
                    onError: (error) => {
                        console.log(error);
                    },
                }
            );

            // Melakukan penambahan ke keranjang atau tindakan lainnya
            // clickedBuy();
        } else {
            setisNotifFalse(true);
            // Memberikan pesan atau tindakan lainnya jika ukuran null
            console.error("Please select a size before adding to cart.");
        }
    };

    const handleOpenForm = () => {
        openForm(false);
        clicked();
    };

    const handleSizeChange = (e) => {
        // onSelectSize(e.target.value);
        setSelectedSize(e.target.value);
    };

    const tipeLocal = localStorage.getItem("tipe");
    const kategoriLocal = localStorage.getItem("kategori");

    const filter = () => {
        if (tipeLocal == null || tipeLocal == null) {
            return true;
        } else if (tipeLocal != tipe || kategoriLocal != kategori) {
            return false;
        } else {
            return true;
        }
    };

    
    // console.log(filter());

    return (
        <div className={`${filter() ? "" : "hidden"}`}>
            <div className={`flex bg-white rounded-lg shadow border p-2`}>
                <div className=" relative flex-none w-24 md:w-48">
                    <img className="h-[22rem]" src={image} alt="img" />
                </div>
                <form className="flex-auto p-6">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-xl font-semibold">
                            {brand}
                        </h1>
                        <div className="text-xl font-semibold text-gray-500">
                            IDR {formatNumberWithCommas(Math.floor(harga))}
                        </div>
                        <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500">
                            {desc}
                        </div>
                        {/* <div>
                            {tipe}
                        </div>
                        <div className="text-red-500" >
                            {kategori}
                        </div> */}
                    </div>
                    <div className="flex items-baseline mt-4 mb-6 text-gray-700">
                        <div className="flex space-x-2">
                            <label className="text-center">
                                <input
                                    type="radio"
                                    className="flex items-center justify-center w-6 h-6 "
                                    name="size"
                                    value="39"
                                    // checked={selectedSize == null ? true : false }
                                    onChange={handleSizeChange}
                                />
                                39
                            </label>
                            <label className="text-center">
                                <input
                                    type="radio"
                                    className="flex items-center justify-center w-6 h-6"
                                    name="size"
                                    value="40"
                                    onChange={handleSizeChange}
                                />
                                40
                            </label>
                            <label className="text-center">
                                <input
                                    type="radio"
                                    className="flex items-center justify-center w-6 h-6"
                                    name="size"
                                    value="41"
                                    onChange={handleSizeChange}
                                />
                                41
                            </label>
                            <label className="text-center">
                                <input
                                    type="radio"
                                    className="flex items-center justify-center w-6 h-6"
                                    name="size"
                                    value="42"
                                    onChange={handleSizeChange}
                                />
                                42
                            </label>
                            <label className="text-center">
                                <input
                                    type="radio"
                                    className="flex items-center justify-center w-6 h-6"
                                    name="size"
                                    value="43"
                                    onChange={handleSizeChange}
                                />
                                43
                            </label>
                        </div>
                        <a
                            href="#"
                            className="hidden ml-auto text-sm text-gray-500 underline md:block"
                        >
                            Size Guide
                        </a>
                    </div>
                    {user.role === "user" ? (
                        <div className="flex mb-4 text-sm font-medium mt-[50px]">
                            <button
                                onClick={() => handleAddCart()}
                                type="button"
                                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                            >
                                Add to cart
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex mb-4 text-sm font-medium">
                                <button
                                    type="button"
                                    onClick={() => handleOpenForm(true)}
                                    className="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="flex mb-4 text-sm font-medium">
                                <button
                                    onClick={() => handleDelete()}
                                    type="button"
                                    className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}

                    <p className="text-sm text-gray-500">
                        Free shipping on all continental US orders.
                    </p>
                    {isNotifTrue && (
                        <div className="text-sm text-green-500">
                            Produk Berhasil Ditambahkan
                        </div>
                    )}
                    {
                        isNotifFalse && (
                            <div >
                                <p className="font-bold text-red-500 text-lg " >Silahkan pilih size terlebih dahulu!!</p>
                            </div>
                        )
                    }
                </form>
                
            </div>
        </div>
    );
};

export default ProductCard;
