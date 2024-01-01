import React from 'react';

interface SortingOptionsProps {
    onSelectSortBy: (sortBy: string) => void;
    onSelectSubject: (subject: string) => void; 
}

const SortingOptions: React.FC<SortingOptionsProps> = ({ onSelectSortBy, onSelectSubject }) => {
    const handleSortByClick = (sortBy: string) => {
        onSelectSortBy(sortBy); 
        console.log("sort fn called") 
    };

 const handleSubjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("filter fn called"+e.target.value);   
    onSelectSubject(e.target.value); 
    };

    return (
        <div className="flex justify-center mt-4">
            <button className="mr-4 px-4 py-2 bg-[#338fc4] text-white rounded-md hover:bg-blue-600 focus:outline-none" onClick={() => handleSortByClick('experience')}>
                Sort by Experience
            </button>
            <button className="px-4 py-2 mr-4 bg-[#424591] text-white rounded-md hover:bg-blue-600 focus:outline-none" onClick={() => handleSortByClick('fee')}>
                Sort by Fee
            </button>

            <select className="px-4 py-2 bg-[#e9e9fa] text-black rounded-md hover:bg-blue-50 focus:outline-none" onChange={handleSubjectSelect}>
                <option value="">Filter by Subject</option>
                <option value="Programming">Programming</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Finance">Finance</option>
            </select>
        </div>
    );
};

export default SortingOptions;