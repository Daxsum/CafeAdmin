import React, { useState } from "react";
import { IconSortDescending, IconSearch } from '@tabler/icons';
import { Center } from '@mantine/core';

const Filter = ({ handleFilter }) => {
  const [searchData, setSearchData] = useState("");
  return (
    <Center>
    <div style={{ display: 'flex' }}>
   {' '}
   {/* Search */}
   <div style={{ display: 'flex' }}>
     <input
       type='text'
       id='search'
       onChange={(e) => {
         setSearchData(e.target.value);
       }}
     />
   </div>
   <div style={{ position: 'absolute', left: '300px' }}>
     {/* Filter */}
     <button
       onClick={() => handleFilter(searchData)}
       className='btn bg-blue-500  text-white'
     >
       <svg
         className='w-4 h-4 fill-current opacity-50 shrink-0'
         viewBox='0 0 16 16'
       >
         <path d='M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z' />
       </svg>
       <span className='hidden xs:block ml-2'>
         <IconSortDescending />
       </span>
     </button>
   </div>
 </div>
 </Center>
  );
};

export default Filter;
