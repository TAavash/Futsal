import React from 'react'
 export const TestFunctionalProps = ({onButtonClick}) => {
  return (
    <>
        <div>TestFunctionalProps</div>
     <button onClick={onButtonClick}  className="bg-blue-800 text-white p-2 rounded m-2 shadow-sm">
        Test Functional Props
      </button>
    </>
  )
}

