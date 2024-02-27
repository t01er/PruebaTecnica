import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PixabayComponent = ({ countryName }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const apiKey = '33642408-24d7be1d992c588d808935a62'; 
        const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${countryName} landscape&image_type=photo&per_page=100`);
 
        if (response.data.hits.length > 0) {
          setImage(response.data.hits[0]);
        } else {
          // console.warn('No se encontraron imágenes para', countryName);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchImage();
  }, [countryName]);

  return (
    <div>     
      {image && (
        <div>
          <img loading='lazy' className='w-full h-96 object-cover rounded-2xl' src={image.webformatURL} alt={image.tags} />
        </div>
      )}
    </div>
  );
};

export default PixabayComponent;
