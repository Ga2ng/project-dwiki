import React, { useState } from "react";
import { router } from "@inertiajs/react";

const ProductForm = ({ closeForm }) => {
    const handleCloseForm = () => {
        closeForm(false);
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [emptyFields, setEmptyFields] = useState([]);
    const [formData, setFormData] = useState({
        brand: "",
        harga: "",
        kategori: "Kids",
        tipe: "Sneakers",
        productDescription: "",
        image: null, // Ini untuk menyimpan file gambar, Anda bisa menggantinya dengan URL jika gambar disimpan di server
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Jika input adalah bukan file gambar
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
        console.log(file);
    };

    // Fungsi untuk menghandle pengiriman formulir
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lakukan sesuatu dengan data formulir, misalnya mengirimnya ke server

        router.post("/product", formData, {
            preserveScroll: true,
            onSuccess: () => {
                // Logika yang ingin Anda lakukan setelah pengiriman berhasil
                closeForm(false);
                window.location.href = '/product';
            },
            onError: (errors) => {
                // Logika yang ingin Anda lakukan jika ada kesalahan
                console.error(errors);
            },
        });
        console.log(formData);
        // Setelah pengiriman berhasil, tutup formulir
        // closeForm(false);

        setEmptyFields([]);

        // Validasi: Periksa apakah ada properti yang masih kosong
        const emptyFields = [];
        for (const key in formData) {
            if (formData.hasOwnProperty(key) && formData[key] === "") {
                emptyFields.push(key);
            }
        }

        // Validasi khusus untuk input file (image)
        if (!formData.image) {
            emptyFields.push("image");
        }

        // Jika ada data yang masih kosong, tampilkan peringatan
        if (emptyFields.length > 0) {
            setEmptyFields(emptyFields);
            // alert(`Fields ${emptyFields.join(", ")} tidak boleh kosong!`);
            setErrorMessage(
                `Fields ${emptyFields.join(", ")} tidak boleh kosong!`
            );
            return; // Hentikan pengiriman formulir jika ada data yang masih kosong
        }

        closeForm(false);
    };

    return (
        <div>
            {closeForm && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#000000d6]  z-50">
                    <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-slate-100 p-4 rounded-lg">
                            <div className="px-5">
                                <button
                                    onClick={() => handleCloseForm(false)}
                                    className="mb-6 bg-red-500 text-white px-4 text-2xl rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
                                >
                                    &times;
                                    {/* &#60; */}
                                </button>
                            </div>

                            <form
                                class="w-full max-w-lg"
                                onSubmit={handleSubmit}
                            >
                                <div className="mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="brand"
                                        >
                                            Brand
                                        </label>
                                        <input
                                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="brand"
                                            name="brand"
                                            type="text"
                                            placeholder="Nike Air Force One"
                                            value={formData.brand}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full px-3">
                                        <label
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                            htmlFor="harga"
                                        >
                                            Harga
                                        </label>
                                        <input
                                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="harga"
                                            name="harga"
                                            type="text"
                                            placeholder="IDR 5.000.000"
                                            value={formData.harga}
                                            onChange={handleChange}
                                            pattern="[0-9]*"
                                            onInput={(e) =>
                                                (e.target.value = Math.max(
                                                    0,
                                                    parseInt(e.target.value) ||
                                                        0
                                                )
                                                    .toString()
                                                    .slice(0, 10))
                                            }
                                        />
                                    </div>
                                    <div className="w-full px-3 flex ">
                                        <div className="w-[50%] p-2">
                                            <label
                                                className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="kategori"
                                            >
                                                Kategori
                                            </label>
                                            <select
                                                className="mt-1 p-2 w-full border  border-gray-300 rounded-md"
                                                id="kategori"
                                                name="kategori"
                                                value={formData.kategori}
                                                onChange={handleChange}
                                            >
                                                <option value="kids">
                                                    Kids
                                                </option>
                                                <option value="men">Men</option>
                                                <option value="women">
                                                    Women
                                                </option>
                                            </select>
                                        </div>
                                        <div className="w-[50%] p-2">
                                            <label
                                                className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="tipe"
                                            >
                                                Tipe
                                            </label>
                                            <select
                                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                                id="tipe"
                                                name="tipe"
                                                value={formData.tipe}
                                                onChange={handleChange}
                                            >
                                                <option value="sneakers">
                                                    Sneakers
                                                </option>
                                                <option value="casual">
                                                    Casual
                                                </option>
                                                <option value="running">
                                                    Running
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-4 px-5">
                                        <label
                                            htmlFor="productDescription"
                                            className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        >
                                            Deskripsi Produk:
                                        </label>
                                        <textarea
                                            id="productDescription"
                                            name="productDescription"
                                            value={formData.productDescription}
                                            onChange={handleChange}
                                            className="mt-1 p-2 w-full border border-gray-300 rounded-md resize-none"
                                            rows="4"
                                        ></textarea>
                                    </div>

                                    <div className="mb-4 px-5">
                                        <label
                                            htmlFor="image"
                                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        >
                                            Pilih Gambar:
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="mt-1 p-2 w-full border bg-white border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="px-5">
                                        {errorMessage && (
                                            <div className="text-red-500 text-sm">
                                                {errorMessage}
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            className="font-bold mt-5 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductForm;
