import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router } from "@inertiajs/react";
import Logo from "../Assets/logo.jpeg";
import CardSlider from "@/Components/CardSlider";

export default function AuthenticatedLayout({ user, header, children }) {
    // console.log(user)
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    //path url
    const isProductPage = window.location.pathname.includes("/product");

    const [isOpen, setOpen] = useState(false);
    const [selectedTipe, setSelectedTipe] = useState("");
    const openDropDown = (value) => {
        setOpen(!isOpen);
        // setSelectedTipe(value)
        console.log("clicked", value);
    };

    const tipe = localStorage.getItem("tipe");
    const kategori = localStorage.getItem("kategori");
    const handleTipeChange = (value) => {
        localStorage.setItem("tipe", value);
    };
    const handleKategoriChange = (value) => {
        localStorage.setItem("kategori", value);
    };
    // const handleSubmit = () => {
    //     router.get("/product", { tipe: tipe, kategori: kategori });
    // };

    const clearLocalStorage = () => {
        localStorage.clear();
        console.log("localStorage cleared!");
    };

    useEffect(() => {
        // Periksa apakah user berada di halaman produk

        // Jika bukan halaman produk, kosongkan localStorage
        if (!isProductPage) {
            clearLocalStorage();
        }
    }, []);
    // console.log("selected", tipe, kategori);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-gray-200 light:bg-gray-900 light:border-gray-700">
                <div
                    className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
                    style={{ textAlign: `center` }}
                >
                    <a href="#" className="flex items-center">
                        <img
                            src={Logo}
                            className="h-12 mr-3 w-12"
                            alt="LandsSport Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
                            Lands.Sport
                        </span>
                    </a>
                    <button
                        data-collapse-toggle="navbar-dropdown"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-dropdown"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className="hidden w-full md:block md:w-3/5"
                        id="navbar-dropdown"
                    >
                        <ul className="ml-[-100px] flex flex-col justify-between font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white light:bg-gray-800 md:light:bg-gray-900 light:border-gray-700">
                            <div className="flex gap-10">
                                <li
                                    className={`${
                                        isProductPage ? "" : "hidden"
                                    }`}
                                >
                                    <Link
                                        href={route("dashboard")}
                                        className="block py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                                        aria-current="page"
                                    >
                                        Home
                                    </Link>
                                </li>
                                {/* <li>
                                    <button
                                    className="bg-blue-500 px-4 text-white rounded-md"
                                    onClick={() => handleSubmit()}
                                    >Cari</button>
                                </li> */}
                                <li
                                    className={`${
                                        isProductPage ? "" : "hidden"
                                    }`}
                                >
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                onClick={() =>
                                                    handleKategoriChange("Kids")
                                                }
                                                id="dropdownNavbarLink"
                                                data-dropdown-toggle="dropdownNavbar"
                                                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-black md:dark:hover:text-blue-500 dark:focus:text-black dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                            >
                                                Kids
                                                <svg
                                                    className="w-2.5 h-2.5 ml-2.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 10 6"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 4 4 4-4"
                                                    />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                onClick={() =>
                                                    handleTipeChange("Sneakers")
                                                }
                                            >
                                                Sneakers
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                onClick={() =>
                                                    handleTipeChange("casual")
                                                }
                                            >
                                                Casual
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                onClick={() =>
                                                    handleTipeChange("running")
                                                }
                                            >
                                                Running
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>

                                <li
                                    className={`${
                                        isProductPage ? "" : "hidden"
                                    }`}
                                >
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                onClick={() =>
                                                    handleKategoriChange("men")
                                                }
                                                id="dropdownNavbarLink"
                                                data-dropdown-toggle="dropdownNavbar"
                                                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-black md:dark:hover:text-blue-500 dark:focus:text-black dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                            >
                                                Men{" "}
                                                <svg
                                                    className="w-2.5 h-2.5 ml-2.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 10 6"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 4 4 4-4"
                                                    />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                onClick={() =>
                                                    handleTipeChange("Sneakers")
                                                }
                                            >
                                                Sneakers
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                onClick={() =>
                                                    handleTipeChange("casual")
                                                }
                                            >
                                                Casual
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                onClick={() =>
                                                    handleTipeChange("running")
                                                }
                                            >
                                                Running
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>

                                <li
                                    className={`${
                                        isProductPage ? "" : "hidden"
                                    }`}
                                >
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button
                                                onClick={() =>
                                                    handleKategoriChange(
                                                        "women"
                                                    )
                                                }
                                                id="dropdownNavbarLink"
                                                data-dropdown-toggle="dropdownNavbar"
                                                className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-black md:dark:hover:text-blue-500 dark:focus:text-black dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                            >
                                                Women{" "}
                                                <svg
                                                    className="w-2.5 h-2.5 ml-2.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 10 6"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 4 4 4-4"
                                                    />
                                                </svg>
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                onClick={() =>
                                                    handleTipeChange("Sneakers")
                                                }
                                            >
                                                Sneakers
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                onClick={() =>
                                                    handleTipeChange("casual")
                                                }
                                            >
                                                Casual
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                onClick={() =>
                                                    handleTipeChange("running")
                                                }
                                            >
                                                Running
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                            </div>
                            <div className="flex gap-10">
                                <li>
                                    <Link
                                        href={route("cart.index")}
                                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark-text-black md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent"
                                    >
                                        <span className="flex items-center">
                                            <span className="mr-2">Cart</span>
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/128/4296/4296929.png"
                                                alt="Cart"
                                                className="h-5 w-5"
                                            />
                                        </span>
                                    </Link>
                                </li>

                                <li>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="flex items-center cursor-pointer">
                                                <span className="mr-2">
                                                    {user.name}{" "}
                                                    {/* <span className="pl-2 uppercase text-blue-500">
                                                        ({user.role})
                                                    </span> */}
                                                </span>
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/128/2815/2815428.png"
                                                    alt="Cart"
                                                    className="h-5 w-5"
                                                />
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Logout
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>

            {header && (
                <header className="bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>
                <div className="bg-white">{children}</div>
            </main>
        </div>
    );
}
