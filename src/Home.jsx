import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import CartInfo from './assets/components/CartInfo';
import ButtonContinents from './assets/components/ButtonContinents';
import PixabayComponent from './assets/components/Imagen';
export default function Home() {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleContinentSelected = (continentCode) => {
    setSelectedContinent(continentCode);
  };



  return (
    <>
      <ApolloProvider client={client}>
        
        <div className=' relative'>
          <main className='relative'>
            <CartInfo selectedContinent={selectedContinent} searchTerm={searchTerm} />
            <div className='flex items-center justify-center'>
              <nav className='my-2 fixed bottom-0 flex lg:w-min w-full ' >
                <ButtonContinents onContinentSelected={handleContinentSelected} />
              </nav>
            </div>
          </main>
        </div>
      </ApolloProvider>
    </>
  );
}
