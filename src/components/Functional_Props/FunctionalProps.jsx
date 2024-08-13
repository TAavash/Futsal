import React from 'react'
import { TestFunctionalProps } from '../CardComponent/TestFunctionalProps';

const FunctionalProps = () => {
    const handleClick = () => {
    alert("Function is passed as props");
  };
  return (
<>
<div>FunctionalProps</div>
<TestFunctionalProps onButtonClick={handleClick} />
</>  )
}

export default FunctionalProps