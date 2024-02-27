import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip';

const CountryModal = ({ country, onClose, image }) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <AnimatePresence >
        <motion.div
          key={country.name}
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          exit={{ scale: 0, }}
          transition={{ ease: "easeOut", duration: .3, }}
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" onClick={onClose}>
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>;
          <div
            className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="text-left text-gray-600 font-bold">
                  <Tooltip id='pais' />
                  <h3 className="text-2xl leading-6 font-black text-gray-900 mb-2" data-tooltip-id='pais' data-tooltip-content={"País"} >{country.name}</h3>
                  <div className='flex flex-col gap-2 w-fit py-5'>
                    <span className='flex items-center gap-1 text-xl' data-tooltip-id='capital' data-tooltip-content={"capital"} >
                      <Tooltip id='capital'/>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                      {country.capital}</span>
                    <span className='flex items-center gap-1 text-xl' data-tooltip-id='idioma' data-tooltip-content={"Idioma"}>
                      <Tooltip id='idioma'/>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                      </svg>
                      {country.languages.map((lang) => lang.name).join(',')}
                    </span>
                    <span className='flex items-center gap-1 text-xl' data-tooltip-id='moneda' data-tooltip-content={"Moneda"}  >
                      <Tooltip id='moneda' />
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                      {country.currency}
                    </span>
                  </div>

                </div>
              </div>
            </div>
            <div className="m-3 absolute top-0 right-0">
              <button
                onClick={onClose}

              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CountryModal;
