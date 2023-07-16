import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  
  return (
    <header className='w-full h-14 max-h-14 fixed shadow-md bg-white'>
      <nav className='w-full max-h-14 sm:px-[120px] flex justify-between items-center'>
        <Link to='/' className='text-[28px] font-semibold text-teal-500'>
            FHIR Adapter.
        </Link>
        <div className='flex flex-1 justify-end items-center'>

                <Link to='/login'>
                <button
                  className='bg-teal-400 px-8 py-2 rounded text-white'
                  
                >
                  Login
                </button>
                </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
