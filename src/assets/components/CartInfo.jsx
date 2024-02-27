import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import PixabayComponent from './Imagen';
import CountryModal from './CountryModal ';
import { motion } from 'framer-motion';

const GET_COUNTRIES = gql`
  {
    countries {
      code
      name
      capital
      languages {
        name
      }
      currency
      emoji
      emojiU
      continent {
        code
        name
      }
    }
  }
`;

export default function CartInfo({ selectedContinent }) {
    const { loading, error, data } = useQuery(GET_COUNTRIES);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedCountries, setDisplayedCountries] = useState(12);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    if (loading) return <p>Cargando...</p>;
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const countries = data.countries;

    const filteredBySearch = countries.filter(
        (country) =>
            (!selectedContinent || country.continent.code.toUpperCase() === selectedContinent.toUpperCase()) &&
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleLoadMore = () => {
        setDisplayedCountries(displayedCountries + 12);
    };

    const handleOpenModal = (country, image) => {
        setSelectedCountry(country);
        setSelectedImage(image);
    };



    const handleCloseModal = () => {
        setSelectedCountry(null);
    };

    const limitedCountries = filteredBySearch.slice(0, displayedCountries);


    return (
        <>
            <div className='flex justify-center py-10 mx-5'>
                <div className="flex flex-col w-fit md:gap-2 gap-5 items-center">
                    <label htmlFor="search" className='font-black text-center md:text-7xl text-5xl text-blue-600'>Buscar País</label>
                    <div className=' items-center w-full border border-slate-600 rounded-full flex gap-2'>
                        <label htmlFor="search" className='px-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </label>

                        <input
                            type="text"
                            id="search"
                            className='w-full py-2 outline-none rounded-full'
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Buscar..."
                        />
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-3 mb-32 px-5 max-w-6xl m-auto'>
                {limitedCountries.length === 0 ? (
                    <p className='text-center col-span-4 text-2xl font-bold'>No se encontraron resultados.</p>
                ) : (
                    limitedCountries.map((country) => (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ ease: 'easeOut', duration: 0.5 }}
                            key={country.code}
                            className='relative  aspect-ration md:aspect-auto border rounded-2xl'
                        >
                            <PixabayComponent countryName={country.name} />
                            <div className='absolute bg-white bottom-0 m-3 p-5 webkit rounded-xl'>
                                <div className='flex items-center gap-1'>
                                    <h3 className='text-lg font-bold'>{country.name}</h3>
                                    <span className='mb-3'>{country.emoji}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='flex items-center text-zinc-500'>
                                        <i>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6 stroke-blue-500 stroke-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                />
                                            </svg>
                                        </i>
                                        <p>{country.continent.name}</p>
                                    </span>
                                    <motion.button
                                        whileHover={{scale:1.04,}}
                                        whileTap={{scale:1.05,}}
                                        transition={{ease:"easeOut"}}
                                        onClick={() => handleOpenModal(country, selectedImage)}
                                        className='text-sm bg-black text-white py-1 px-3 rounded-full'
                                    >
                                        Ver mas
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}

                {displayedCountries < filteredBySearch.length && (
                    <div className="text-center  md:col-span-4 col-span-1">
                        <button className="py-2 px-4 bg-blue-700 shadow-lg shadow-blue-200  text-white rounded-full mt-3" onClick={handleLoadMore}>
                            Cargar Más...
                        </button>
                    </div>
                )}
            </div>

            {selectedCountry && (
                <CountryModal country={selectedCountry} image={selectedImage} onClose={handleCloseModal} />
            )}
        </>
    );
}
