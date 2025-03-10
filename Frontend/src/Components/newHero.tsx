import React, { useEffect, useState } from 'react';
// import { Link, Router } from 'react-router-dom';
import { Link, BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter and Route


interface NavigationItem {
    title: string;
    path: string;
}

const HeroSection: React.FC = () => {
    const [state, setState] = useState<boolean>(false);

    const navigation: NavigationItem[] = [
        { title: "Features", path: "javascript:void(0)" },
        { title: "Integrations", path: "javascript:void(0)" },
        { title: "Customers", path: "javascript:void(0)" },
        { title: "Pricing", path: "javascript:void(0)" }
    ];

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".menu-btn")) setState(false);
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const Brand: React.FC = () => (
        <div className="flex items-center justify-between py-5 md:block">
            <div className="md:hidden">
                <button
                    className="menu-btn text-gray-500 hover:text-gray-800"
                    onClick={() => setState(!state)}
                >
                    {state ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <Router>
        <div className='relative'>
            <div className='absolute inset-0 blur-xl h-[580px]' style={{ background: "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)" }}></div>
            <div className='relative'>
                <header>
                    <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
                        <Brand />
                    </div>

                </header>
                <section>
                    <div className="max-w-screen-xl mx-auto py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
                        <div className='flex-none space-y-5 max-w-xl mt-28'>
    
                            <h1 className="text-4xl text-purple-900 font-extrabold sm:text-5xl">
                                DadaDidi - Find Tutors you can relate to.
                            </h1>
                            <p>
                                A wide range of young and energetic tutors you can count on.
                            </p>
                            <div className='flex items-center gap-x-3 sm:text-xl'>
                                <Link to="/sorting-component" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-blue-800 duration-150 hover:bg-blue-700 active:bg-gray-900 rounded-full md:inline-flex">
                                    Get started
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                
                            </div>
                        </div>
                        <div className='flex-none hidden md:block'>
                           
                            <img src="src\assets\images\hero.png" className="max-w-xl" alt="Illustration" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
        {/* <Route path="/sorting-component" Component={SortingOptions} /> */}

        </Router>
    );
};

export default HeroSection;
