import React from 'react';
import Futsal1 from '../../assets/futsal1.jpg';
import Futsal2 from '../../assets/futsal-court.webp';

const NearbyFields = () => {
  const fields = [
    { name: 'Castelmola Futsal', rating: 4.5, price: 'Rp 250.000', imgSrc: `${Futsal1}` },
    { name: 'AS Futsal', rating: 4.4, price: 'Rp 200.000', imgSrc: `${Futsal2}` }
  ];

  return (
    <div className="p-10 bg-white rounded-t-3xl">
      <h2 className="text-2xl font-bold mb-6">Futsal Courts</h2>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <img src={field.imgSrc} alt={field.name} className="w-full h-32 rounded-lg mb-4 object-cover" />
            <h3 className="text-xl font-semibold">{field.name}</h3>
            <p className="text-sm text-gray-600">Rating: {field.rating}</p>
            <p className="text-sm text-gray-600">Price: {field.price}</p>
            <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyFields;
