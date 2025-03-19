import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

const SearchBar = () => {
    const [searchs, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = () => {
        setIsOpen(!isOpen);
    };

    const handleSearchToggle = (e) => {
        e.preventDefault();
        console.log("Search:", searchs);
        setIsOpen(false);
    };

    return (
        <div className={`d-flex justify-content-center align-items-center transition ${isOpen ? "position-absolute top-0 start-0 w-100 bg-white py-3 z-3" : "w-auto"}`}>
            {isOpen ? (
                <form onSubmit={handleSearchToggle} className='position-relative w-50 d-flex'>
                    <input 
                        type="text" 
                        placeholder='Search' 
                        value={searchs} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className='form-control rounded-pill px-4 py-2 shadow-sm'
                    />
                    <button type='submit' className='btn position-absolute end-0 top-50 translate-middle-y text-secondary'>
                        <HiMagnifyingGlass className='fs-5'/>
                    </button>
                    <button onClick={handleSearch} type='button' className='btn position-absolute end-0 me-5 top-50 translate-middle-y text-secondary'>
                        <HiMiniXMark className='fs-5'/>
                    </button>
                </form>
            ) : (
                <button onClick={handleSearch} className='btn text-secondary'>
                    <HiMagnifyingGlass className='fs-5'/>
                </button>
            )}
        </div>
    );
};

export default SearchBar;