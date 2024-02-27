import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PixabayComponent = ({ countryName }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const apiKey = '33642408-24d7be1d992c588d808935a62';
        const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${countryName} landscape&image_type=photo&per_page=100`);

        if (response.data.hits.length > 0) {
          setImage(response.data.hits[0]);
        } else {
          setError(true); 
        }
      } catch (error) {
        console.error('Error', error);
        setError(true); 
      }
    };

    fetchImage();
  }, [countryName]);

  return (
    <div>
      {error ? (
        <div>        
          <img loading='lazy' className='w-full h-96 object-cover rounded-2xl' src="https://arqueologiadelperu.com/wp-content/uploads/2014/09/valle-del-sondongo.jpg" alt="Imagen de respaldo" />
        </div>
      ) : (
        <div>
          {image && (
            <img loading='lazy' className='w-full h-96 object-cover rounded-2xl' src={image.webformatURL} alt={image.tags} />
          )}
        </div>
      )}
    </div>
  );
};

export default PixabayComponent;
