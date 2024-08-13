import React from "react";

const CardComponent = ({productData}) => {

  return (
    <>
      <div className="flex flex-wrap justify-around items-center my-2">
        {productData.map((product, index) => {
          return (
            <div
              className="max-w-sm rounded-lg  overflow-hidden shadow-lg "
              key={index}
            >
              <img
                className="w-full h-64 object-cover p-5 bg-cover rounded "
                src={product.imgUrl}
                alt="fashion beauty"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2"> {product.title}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
              </div>
              <div className="px-6 py-4 text-left">
                <button className="bg-black text-white px-5 py-2 text-center">
                  Learn more..
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CardComponent;
