import { Link, Head } from "@inertiajs/react";
import Walpaper from "../Assets/walpaper.jpg";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="relative h-screen overflow-hidden bg-indigo-900">
                <img
                    src={Walpaper}
                    className="absolute object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black opacity-25"></div>
                <header className="absolute top-0 left-0 right-0 z-20">
                    <nav className="container px-6 py-4 mx-auto md:px-12">
                        <div className="items-center justify-between md:flex">
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-white">
                                    <svg
                                        className="w-8 mr-2 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-name="Capa 1"
                                        viewBox="0 0 16.16 12.57"
                                    >
                                        <defs></defs>
                                        <path d="M14.02 4.77v7.8H9.33V8.8h-2.5v3.77H2.14v-7.8h11.88z"></path>
                                        <path d="M16.16 5.82H0L8.08 0l8.08 5.82z"></path>
                                    </svg>
                                </a>
                                <div className="md:hidden">
                                    <button className="text-white focus:outline-none">
                                        <svg
                                            className="w-12 h-12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4 6H20M4 12H20M4 18H20"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="items-center hidden md:flex ">
                                {auth.user ? (
                                    <button
                                        onClick={() =>
                                            (window.location.href =
                                                route("login"))
                                        }
                                        href={route("dashboard")}
                                        classNameName="mr-5 font-semibold text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Dashboard
                                    </button>
                                ) : (
                                    <></>
                                )}
                                <Link
                                    href={route("login")}
                                    className="font-semibold text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route("register")}
                                    className="ml-4 font-semibold text-white hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
                    <div className="relative z-10 flex flex-col items-start lg:w-3/5 xl:w-2/5">
                        <span className="font-bold text-yellow-400 uppercase">
                            Lands.Sport
                        </span>
                        <h1 className="mt-4 text-6xl font-bold leading-tight text-white sm:text-7xl">
                            Step Out In Style
                        </h1>
                        <a
                            href="#"
                            className="block px-4 py-3 mt-10 text-lg font-bold text-gray-800 uppercase bg-white rounded-lg hover:bg-gray-100"
                        >
                        GO
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
