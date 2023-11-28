import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProductCard from "@/Components/ProductCard";
import { Link, router, usePage } from "@inertiajs/react";
import ProductForm from "@/Components/ProductForm";
import ProductEditForm from "@/Components/ProductEditForm";

const ProductPage = ({ auth, success }) => {
    //For admin
    const { produk } = usePage().props;
    const [products, setProducts] = useState(produk);
    const [openForm, setOpenForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const openEdit = (data) => {
        setOpenEditForm(true);
    };
    const closeEdit = () => {
        setOpenEditForm(false);
    };

    const EditForm = (product) => {
        // Create an object with all product values
        const editFormData = {
            id: product.id,
            brand: product.brand,
            harga: product.harga,
            image: product.image,
            kategori: product.kategori,
            tipe: product.tipe,
            productDescription: product.productDescription,
        };

        // Set the editForm state with the object
        setEditingProduct(editFormData);
    };
    // console.log("editingProd", editingProduct)

    // pertama kali render ambil data
    useEffect(() => {
        if (!products) {
            router.get("/product");
        }
        return;
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            {/* <div>{succesMessage}</div> */}
            <div className="py-4 px-10">
                {auth.user.role === "admin" ? (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setOpenForm(!openForm)}
                            className="bg-blue-600 hover:bg-blue-700   rounded-lg py-2 px-3 text-white"
                        >
                            + New Product
                        </button>
                    </div>
                ) : (
                    ""
                )}

                <div className="grid grid-cols-2 gap-4">
                    {/* <ProductCard user={auth.user} /> */}
                    {!products && (
                        <div className="text-[35px] text-gray-400 text-center flex justify-center items-center font-bold h-[80vh] col-span-2 ">
                            Data Empty
                        </div>
                    )}
                    {products &&
                        products.map((data) => (
                            <ProductCard
                            tipe={data.tipe}
                            kategori={data.kategori}
                                key={data.id}
                                user={auth.user}
                                brand={data.brand}
                                harga={data.harga}
                                image={data.image}
                                desc={data.productDescription}
                                openForm={openEdit}
                                clicked={() => EditForm(data)}
                                // clickedBuy={() => handleCardClick(data)}
                                idValue={data.id}
                                allValue={data}
                                // onSelectSize={handleSizeChange}
                            />
                        ))}
                </div>

                {/* pop up form */}
                {openForm && <ProductForm closeForm={setOpenForm} />}
                {openEditForm && (
                    <ProductEditForm
                        closeForm={closeEdit}
                        editValue={editingProduct}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductPage;
