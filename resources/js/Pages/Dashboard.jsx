import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Logo from "../Assets/logo.jpeg";
import CardSlider from "@/Components/CardSlider";

export default function Dashboard({ auth }) {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <section className="bg-center bg-no-repeat bg-[url('https://images.footballfanatics.com/north-carolina-tar-heels/unisex-nike-white-north-carolina-tar-heels-pegasus-37-running-shoes_pi3768000_altimages_ff_3768444-bc7751f5079e9b9823cbalt1_full.jpg?_hv=2&w=900')] bg-light-gray-700 bg-blend-multiply">
                <div className="px-20 mx-auto min-h-screen text-left pt-24 pb-0">
                    <h1 className="text-5xl font-semibold tracking-tight leading-none text-black md:text-5xl lg:text-5xl">
                        NIKE AIR ZOOM
                    </h1>
                    <h1 className="font-semibold text-4xl mb-6 text-black-800 leading-tight">
                        PEGASUS 37
                    </h1>
                    <p className="text-lg font-normal text-black-300 lg:text-xl">
                        The wait is over. A beautiful blend of design
                    </p>
                    <p className="text-lg font-normal text-black-300 lg:text-xl">
                        and technology in every step of your running.
                    </p>
                </div>
                <div className="grid grid-cols-5">
                    <div className="flex justify-center items-center">
                        <p>
                            <b>BRAND</b> NIKE
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p>
                            <b>MODEL</b> AIR ZOOM PEGASUS 37
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p>
                            <b>COLOR</b> OBSIDIAN MIST
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p>
                            <b>PRICE</b> 1.5M
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={route("product.show")}
                            className="py-4 px-6 bg-gray-700 rounded-full text-white"
                        >
                            SHOP NOW
                        </Link>
                    </div>
                </div>
            </section>
            <section className="px-24 pb-24 pt-10">
                <div className="mb-24">
                    <h1 className="font-semibold text-4xl mb-6 text-black-800 leading-tight text-center mt-10">
                        WHAT'S TRENDING
                    </h1>
                </div>
                <div id="slider" >
                    <CardSlider />
                </div>
            </section>
            <section
                className="bg-center bg-no-repeat bg-cover bg-light-gray-700 bg-blend-multiply"
                style={{
                    backgroundImage: `url('https://img.freepik.com/free-photo/closeup-shoes-while-running_53876-15981.jpg?w=740&t=st=1699267738~exp=1699268338~hmac=7528d8d38c23433f8aec90536efa94c762ac312d074cca02ed7e67394ca71282')`,
                }}
            >
                <div className="px-20 mx-auto min-h-screen text-right pt-24 pb-0">
                    <h1 className="text-5xl tracking-tight leading-none text-black md:text-5xl lg:text-5xl">
                        YOUR SMALL STEP
                    </h1>
                    <h1 className="font-semibold text-4xl mb-6 text-black-800 leading-tight">
                        <b>OUR LONG JOURNEY</b>
                    </h1>
                    <p className="text-lg font-normal text-black-300 lg:text-xl">
                        We care about every step you start,
                    </p>
                    <p className="text-lg font-normal text-black-300 lg:text-xl">
                        and we will continue to be present until.
                    </p>
                    <div style={{ marginTop: "30px" }}>
                        <Link
                            href={route("product.show")}
                            className="py-4 px-6 bg-gray-700 rounded-full text-white mr-3"
                        >
                            EXPLORE
                        </Link>
                        <Link
                            href={route("product.show")}
                            className="py-4 px-6 bg-white rounded-full text-black"
                        >
                            SHOP NOW
                        </Link>
                    </div>
                </div>
            </section>
            <section
                className="px-28 py-16"
                style={{ backgroundColor: "black" }}
            >
                <div className="flex justify-between items-center">
                    <div className="">
                        <p style={{ color: "white" }}>
                            Following Social Media to our newsletter to stay
                            up-to-date with
                        </p>
                        <p style={{ color: "white" }}>latest products,</p>
                        <p style={{ color: "white" }}>
                            special promotions, and other information for our
                            customers.
                        </p>
                    </div>
                    <div id="contact" className="flex gap-4">
                        <Link
                            href={route("cart.index")}
                            class="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark-text-black md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent"
                        >
                            <span class="flex items-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
                                    alt="Instagram"
                                    className="h-5 w-5"
                                />
                            </span>
                        </Link>
                        <Link
                            href={route("cart.index")}
                            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark-text-black md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent"
                        >
                            <span className="flex items-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/5968/5968841.png"
                                    alt="Whatsapp"
                                    className="h-5 w-5"
                                />
                            </span>
                        </Link>
                        <Link
                            href={route("cart.index")}
                            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark-text-black md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent"
                        >
                            <span className="flex items-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/9068/9068642.png"
                                    alt="Email"
                                    className="h-5 w-5"
                                />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-white bg-yellow-400 pt-4 pb-8 xl:pt-8">
                <div className="max-w-screen-lg px-4 mx-auto text-white xl:max-w-screen-xl sm:px-6 md:px-8 dark:text-white">
                    <ul className="flex flex-wrap justify-center pb-8 text-lg font-light">
                        <li className="w-1/2 md:w-1/3 lg:w-1/3">
                            <div className="text-center">
                                <h2 className="text-black text-md uppercase mb-4">
                                    PRODUCTS
                                </h2>
                                <ul>
                                    <li
                                        className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
                                        style={{ color: "black" }}
                                    >
                                        <button onClick={()=> scrollToSection('slider')} >New Arrivals</button>
                                    </li>
                                    <li
                                        className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
                                        style={{ color: "black" }}
                                    >
                                        <button  onClick={()=> scrollToSection('slider')}>Best Sellers</button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="w-1/2 md:w-1/3 lg:w-1/3">
                            <div className="text-center">
                                <h2 className="text-black text-md uppercase mb-4">
                                    GET HELP
                                </h2>
                                <ul>
                                    <li
                                        className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
                                        style={{ color: "black" }}
                                    >
                                        <a  href={route("product.show")}>Shipping</a>
                                    </li>
                                    <li
                                        className="mb-4 transition-colors duration-200 hover:text-gray-800 dark:hover:text-white"
                                        style={{ color: "black" }}
                                    >
                                        <button onClick={() => scrollToSection('contact')}>Contact Us</button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="w-1/2 md:w-1/3 lg:w-1/3">
                            <div className="text-center">
                                <h4 className="text-black text-md uppercase mb-4">
                                    ABOUT US
                                </h4>
                                <ul>
                                    <li
                                        className="mb-4 transition-colors duration-200 hover:text-white dark:hover:text-white"
                                        style={{ color: "black" }}
                                    >
                                        <a href="https://www.nike.com/id/">Stories</a>
                                    </li>
                                    <li
                                        className="mb-4 transition-colors duration-200 hover:text-white dark:hover:text-white"
                                        style={{ color: "black" }}
                                    >
                                        <a href="https://www.nike.com/id/">News</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <footer
                className="px-20 py-10 "
                style={{ backgroundColor: "black" }}
            >
                <a
                    href="#"
                    class="flex justify-between items-center items-center"
                >
                    <img
                        src={Logo}
                        class="h-12 mr-3 w-12"
                        alt="LandsSport Logo"
                    />
                    <span
                        class="self-left text-1xl font-semibold whitespace-nowrap dark:text-black"
                        style={{ color: "white", marginLeft: "-500px" }}
                    >
                        <p>Lands.Sport</p>
                        <p>Surabaya Kenjeran, Jawa Timur,Indonesia</p>
                    </span>

                    <span
                        class="self-right text-1xl whitespace-nowrap dark:text-black flex justify-end"
                        style={{ color: "white" }}
                    >
                        <p>2021 Lands.Sport, Inc. All Rights Reserved.</p>
                    </span>
                </a>
            </footer>
        </AuthenticatedLayout>
    );
}
