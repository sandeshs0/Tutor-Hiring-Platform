import React, { useState } from "react";

interface NavigationItem {
    title: string;
    path: string;
}

const Navigation: React.FC = () => {
    const [state, setState] = useState(false);

    // Replace javascript:void(0) path with your path
    const navigation: NavigationItem[] = [
        { title: "Partners", path: "javascript:void(0)" },
        { title: "Customers", path: "javascript:void(0)" },
        { title: "Team", path: "javascript:void(0)" },
    ];

    return (
        <>
            <nav className="relative items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
                <div className="flex justify-between">
                    <a href="javascript:void(0)">
                        <img
                            src="https://www.floatui.com/logo.svg"
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
                    <button
                        className="text-gray-500 outline-none md:hidden"
                        onClick={() => setState(!state)}
                    >
                        {state ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <ul
                    className={`flex-1 justify-between mt-12 md:text-sm md:font-medium md:flex md:mt-0 ${
                        state
                            ? "absolute inset-x-0 px-4 border-b bg-white md:border-none md:static"
                            : "hidden"
                    }`}
                >
                    <div className="items-center space-y-5 md:flex md:space-x-6 md:space-y-0 md:ml-12">
                        {navigation.map((item, idx) => (
                            <li className="text-gray-500 hover:text-indigo-600" key={idx}>
                                <a href={item.path}>{item.title}</a>
                            </li>
                        ))}
                    </div>
                    <li className="order-2 py-5 md:py-0">
                        <a
                            href="javascript:void(0)"
                            className="py-2 px-5 rounded-lg font-medium text-white text-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 duration-150 block md:py-3 md:inline"
                        >
                            Get started
                        </a>
                    </li>
                </ul>
            </nav>
            <section className="py-28">
                <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
                    <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
                        <h1 className="text-sm text-indigo-600 font-medium">Over 200 successful deals</h1>
                        <h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
                            We help startups to grow and make money
                        </h2>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium,
                            totam rem aperiam, eaque ipsa quae.
                        </p>
                        <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                            <a
                                href="javascript:void(0)"
                                className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
                            >
                                Let's get started
                            </a>
                            <a
                                href="javascript:void(0)"
                                className="flex items-center justify-center gap-x-2 py-2 px-4 text-center text-gray-600 font-medium duration-150 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-lg shadow-md hover:shadow-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                                Learn more
                            </a>
                        </div>
                    </div>
                    <div className="relative h-64 mt-12 sm:mt-0 sm:h-auto sm:max-w-xl">
                        <img
                            src="https://www.floatui.com/illustration.svg"
                            className="absolute inset-0 object-cover w-full h-full mx-auto shadow-lg sm:relative sm:h-auto sm:w-auto"
                            alt="Illustration"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Navigation;
