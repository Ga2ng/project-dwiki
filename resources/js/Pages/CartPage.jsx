import React, { useCallback, useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router, useForm } from "@inertiajs/react";
import TableHistory from "@/Components/TableHistory";

const CartPage = ({ auth, carts }) => {
    const { data, put } = useForm({ carts });
    console.log(carts);

    const role = auth.user.role;
    // console.log(role);

    const [cartData, setCartData] = useState(carts);

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleDelete = (id) => {
        console.log("coba cok", id);

        router.delete(`cart/${id}`, {
            onSuccess: () => {
                console.log("berhasil di hapus");
                window.location.href = "/cart";
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    const totalHarga = cartData.reduce((total, item) => {
        // Periksa status checkout sebelum menambahkan harga
        if (item.checkout === 0) {
            // Tambahkan properti qty atau tentukan nilai default jika properti tidak ada
            const qty = item.qty || 1;
            return total + item.product_harga * qty;
        }

        return total;
    }, 0);

    // Objek untuk menyimpan jumlah berdasarkan kombinasi size dan nama product

    const handleCheckOut = () => {
        put("/cart", {
            onSuccess: () => {
                console.log("berhasil di hapus");
                window.location.reload();
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    // Filter produk dengan checkout 1 dan status 0
    const filteredProducts = cartData.filter(
        (product) => product.checkout === 1 && product.status === 0
    );
    // Hitung jumlah produk yang sesuai dengan kriteria
    const totalProducts = filteredProducts.length;

    const handleVerif = (id) => {
        console.log(id);
        // setVerif(true);
        router.patch(
            `/cart`,
            { id },
            {
                onSuccess: () => {
                    console.log("berhasil di verif");
                    window.location.href = "/cart";
                },
                onError: (error) => {
                    console.log(error);
                },
            }
        );
    };

    useEffect(() => {
        setCartData(data.carts);
        // setCartVerif(verif.carts)
    }, [data.carts]);

    const qtyMap = {};
    // Iterasi melalui array objek
    carts.forEach((item) => {
        const key = `${item.size}_${item.product_id}_${item.checkout}`;

        // Perbarui informasi berdasarkan kondisi
        if (qtyMap[key]) {
            qtyMap[key].qty += 1;
        } else {
            qtyMap[key] = {
                qty: 1,
                harga: item.product_harga,
                nama_brand: item.product_brand,
                size: item.size,
                checkout: item.checkout,
                status: item.status,
                // tambahkan properti lain sesuai kebutuhan
            };
        }
    });
    // console.log(cartData);
    // console.log(carts);
    // console.log(qtyMap);
    const qtyArray = Object.values(qtyMap);
    // console.log(qtyArray);

    const [isHistory, setHistory] = useState(false);
    const openHistory = () => {
        setHistory(!isHistory);
    };

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return date.toLocaleString("id-ID", options); // Sesuaikan dengan locale yang diinginkan
    }

    console.log(cartData);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className=" bg-gray-100 pt-20">
                {role == "user" && (
                    <div className="w-full flex justify-end">
                        <button
                            onClick={() => openHistory()}
                            className="bg-green-500 text-white p-2 rounded-lg mr-16 mb-12"
                        >
                            History Pembayaran
                        </button>
                    </div>
                )}
                {role == "admin" && (
                    <div className="w-full flex justify-end">
                        <button
                            onClick={() => openHistory()}
                            className="bg-green-500 text-white p-2 rounded-lg mr-16 mb-12"
                        >
                            History Pembayaran Admin
                        </button>
                    </div>
                )}
                {isHistory && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#000000d6]  z-50">
                        <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-slate-100 p-4 rounded-lg ">
                                <div className="px-5">
                                    <button
                                        onClick={() => setHistory(false)}
                                        className="mb-6 bg-red-500 text-white px-4 text-2xl rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
                                    >
                                        &times;
                                        {/* &#60; */}
                                    </button>
                                </div>
                                <div className="">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    History Pembayaran
                                                </th>
                                            </tr>
                                        </thead>
                                        <div className="h-[80vh] overflow-y-scroll w-[800px]">
                                            {cartData.map((item) => (
                                                <tbody
                                                    className={`${
                                                        item.checkout == 1
                                                            ? ""
                                                            : "hidden"
                                                    } `}
                                                >
                                                    <tr>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 w-10 h-10">
                                                                    <img
                                                                        className="w-full h-full rounded-full"
                                                                        // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                                        src={
                                                                            item.product_image
                                                                        }
                                                                        alt="image"
                                                                    />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        {
                                                                            item.product_brand
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {role == "admin" && (
                                                            <td className="px-5 py-5 border-b w-[100px] border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    id user:{" "}
                                                                    {
                                                                        item.user_id
                                                                    }
                                                                </p>
                                                            </td>
                                                        )}
                                                        <td className="px-5 py-5 border-b w-[100px] border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                Size :{" "}
                                                                {item.size}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b w-[150px] border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                IDR{" "}
                                                                {
                                                                    item.product_harga
                                                                }
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {formatDate(
                                                                    item.created_at
                                                                )}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            {item.status ==
                                                            1 ? (
                                                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                                    <span
                                                                        aria-hidden
                                                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                                    ></span>
                                                                    <span className="relative">
                                                                        Berhasil
                                                                    </span>
                                                                </span>
                                                            ) : (
                                                                <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                                                    <span
                                                                        aria-hidden
                                                                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                                                    ></span>
                                                                    <span className="relative">
                                                                        Pending
                                                                    </span>
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                        </div>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <h1 className="mb-10 text-center text-2xl font-bold">
                    Cart Items
                </h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {role == "user"
                            ? cartData.map((data) => (
                                <div
                                    key={data.id}
                                    className={`  ${
                                        data.checkout == 1 || data.status == 1
                                            ? "hidden"
                                            : " sm:flex"
                                    } justify-between mb-6 rounded-lg bg-white p-6 shadow-md  sm:justify-start`}
                                >
                                    <img
                                        // src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
                                        src={data.product_image}
                                        alt="product-image"
                                        className=" h-[130px] w-full rounded-lg sm:w-40"
                                    />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">
                                                {data.product_brand}
                                            </h2>
                                            <p className="mt-1 text-xs text-gray-700">
                                                {data.product_description}
                                            </p>
                                            <div className="font-bold mt-1 text-xs text-gray-700">
                                                Size : {data.size}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center justify-end border-gray-100  ">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(data.id)
                                                    }
                                                    className="cursor-pointer rounded-r bg-red-500 py-1 px-3 duration-100 hover:bg-red-600 text-white"
                                                >
                                                    {" "}
                                                    &times;{" "}
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-4 ">
                                                <p className="text-sm">
                                                    IDR{" "}
                                                    {formatNumberWithCommas(
                                                        data.product_harga
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        : //admin section
                            cartData.map((data) => (
                                <div
                                    key={data.id}
                                    className={`  ${
                                        data.checkout == 0 || data.status == 1
                                            ? "hidden"
                                            : " sm:flex"
                                    } justify-between mb-6 rounded-lg bg-white p-6 shadow-md  sm:justify-start`}
                                >
                                    <img
                                        // src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
                                        src={data.product_image}
                                        alt="product-image"
                                        className=" h-[130px] w-full rounded-lg sm:w-40"
                                    />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">
                                                {data.product_brand}
                                            </h2>
                                            <p className="mt-1 text-xs text-gray-700">
                                                {data.product_description}
                                            </p>
                                            <div className="font-bold mt-1 text-xs text-gray-700">
                                                Size : {data.size}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center justify-end border-gray-100  ">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            data.id
                                                        )
                                                    }
                                                    className="cursor-pointer rounded-r bg-red-500 py-1 px-3 duration-100 hover:bg-red-600 text-white"
                                                >
                                                    {" "}
                                                    &times;{" "}
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-4 ">
                                                <p className="text-sm">
                                                    IDR{" "}
                                                    {formatNumberWithCommas(
                                                        data.product_harga
                                                    )}
                                                </p>
                                            </div>
                                            {/* <div>status {data.status}</div>
                                    <div>
                                        chechkout {data.checkout}
                                    </div> */}
                                            <button
                                                onClick={() =>
                                                    handleVerif(data.id)
                                                }
                                                className="text-white text-center px-4 py-1 rounded-md bg-green-500"
                                            >
                                                Verifikasi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* <!-- Sub total --> */}
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/2">
                        {role == "admin" && (
                            <div className="text-[20px] font-bold ">
                                <div className="">
                                    Barang yang Belum diverifikasi :{" "}
                                    <span className=" text-red-500">
                                        {totalProducts}
                                    </span>
                                </div>
                            </div>
                        )}
                        {role == "user" && (
                            <div className="mb-2 grid grid-cols-9">
                                <p className="col-span-4 text-gray-700 font-bold ">
                                    Barang
                                </p>
                                <p className="col-span-2 text-gray-700 font-bold ">
                                    Harga
                                </p>
                                <p className="col-span-1 text-end  text-gray-700 font-bold ">
                                    Size
                                </p>
                                <p className="col-span-2  text-end text-gray-700 font-bold ">
                                    Jumlah
                                </p>
                            </div>
                        )}
                        {role == "user" &&
                            qtyArray.map((item) => (
                                <div
                                    key={item.id}
                                    className={`${
                                        item.checkout == 1 ? "hidden" : " "
                                    } mb-2 grid grid-cols-9`}
                                >
                                    <p className="col-span-4 text-gray-700">
                                        {item.nama_brand}
                                    </p>
                                    <p className="col-span-2 text-gray-700">
                                        IDR {formatNumberWithCommas(item.harga)}
                                    </p>
                                    <p className="col-span-1 text-end text-gray-700">
                                        {item.size}
                                    </p>
                                    <p className="col-span-2  text-end text-gray-700">
                                        {item.qty}
                                    </p>
                                </div>
                            ))}
                        {role == "user" && (
                            <div>
                                <hr className="my-4" />
                                <div className="flex justify-between">
                                    <p className="text-lg font-bold">Total</p>
                                    <div className="">
                                        <p className="mb-1 text-lg font-bold">
                                            IDR{" "}
                                            {formatNumberWithCommas(totalHarga)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCheckOut()}
                                    className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                                >
                                    Check out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CartPage;
