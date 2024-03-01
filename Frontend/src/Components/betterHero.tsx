import React from 'react';

interface NavigationItem {
    title: string;
    path: string;
}

const navigation: NavigationItem[] = [
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Careers", path: "javascript:void(0)" },
];

const Hero: React.FC = () => {
    return (
        <div className="bg-gray-50">
=
            <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
                <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                    <h1 className="text-gray-900 font-bold text-4xl xl:text-5xl">
                        Find tutors you can relate
                        <br /> <span className="text-indigo-800 text-6xl"> DadaDidi</span>
                    </h1>
                    <p className="text-gray-800 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                    A platform for students to search for tutors based on their needs and for tutors to get part-time job opportunities based on their availability time.                    </p>
                    <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                        <a href="/register" className="px-7 py-3 w-full bg-indigo-700 text-gray-100 text-center rounded-md shadow-md block sm:w-auto">
                            Become a Tutor
                        </a>
                        <a href="/tutor-login" className="px-7 py-3 w-full bg-gray-700 text-gray-200 text-center rounded-md block sm:w-auto">
                            Tutor Login
                        </a>
                    </div>
                </div>
                <div className="flex-1 text-center mt-0 lg:mt-0 lg:ml-3">
                    <img src="src\assets\images\hero.png" className="w-full mx-auto sm:w-10/12  lg:w-full" alt="Illustration" />
                </div>
            </section>
        </div>
    );
}

export default Hero;
