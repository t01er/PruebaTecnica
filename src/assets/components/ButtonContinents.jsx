import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { motion } from 'framer-motion';

const GET_CONTINENTS = gql`
  {
    continents {
      code
      name
    }
  }
`;

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,          
    },
    
  },
};

export default function ButtonContinents({ onContinentSelected }) {
  const { loading, error, data } = useQuery(GET_CONTINENTS);
  const [selectedContinent, setSelectedContinent] = useState(null);

  if (loading) {
    return <p>Cargando</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const continents = data.continents;

  const handleContinentClick = (continentCode) => {
    setSelectedContinent(continentCode);
    onContinentSelected(continentCode);
  };

  const handleAllClick = () => {
    setSelectedContinent(null);
    onContinentSelected(null);
  };

  return (
    <ul className=' bg-black/35 backdrop-blur-xl rounded-full md:py-5 md:px-4 py-2 px-3 flex w-full  md:overflow-auto overflow-y-scroll  shadow-xl gap-3'>
      <li className='scroll-ml-6 '>
        <motion.button
          variants={buttonVariants}
          whileHover='hover'
          whileTap={{ scale: 1.2, }}
          className={`text-sm flex items-center gap-1 md:py-2 md:px-4 py-1 px-2  rounded-full ${selectedContinent === null ? 'bg-blue-700 shadow-lg shadow-blue-300 text-white' : 'bg-white '
            }`}
          onClick={handleAllClick}
        >
          <span className={`p-2 rounded-full ${selectedContinent === null ? 'bg-white' : 'bg-stone-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={selectedContinent === null ? 'currentColor' : 'white'} className={`w-6 h-6 ${selectedContinent === null ? 'stroke-stone-600' : 'stroke-slate-500'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
            </svg>
          </span>
          Todos
        </motion.button>
      </li>
      {continents.map((continent) => (
        <li key={continent.code}>
          <motion.button
            variants={buttonVariants}
            whileHover='hover'
            whileTap={{ scale: 1.2, }}
            className={`scroll-ml-6  text-sm flex items-center gap-1 md:py-2 md:px-4 py-1 px-2   rounded-full ${selectedContinent === continent.code ? 'bg-blue-700 shadow-lg shadow-blue-300 text-white' : 'bg-white text-black'
              }`}
            onClick={() => handleContinentClick(continent.code)}
          >
            <span className={`p-2 rounded-full ${selectedContinent === null ? 'bg-white' : 'bg-stone-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={selectedContinent === null ? 'currentColor' : 'white'} className={`w-6 h-6 ${selectedContinent === null ? 'stroke-stone-600' : 'stroke-slate-500'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
              </svg>
            </span>
            {continent.name}
          </motion.button>
        </li>
      ))}
    </ul>
  );
}
