import React from "react";

const GreetComponent = (props) => {
  const styles = {
    divStyles: {
      backgroundColor: "black",
      padding: "10px",
      margin: "10px",
      boxShadow: "2px 2px 2px 2px #ccc",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.divStyles} className="text-white">
      Hello, {props.name}! we are learning props in react
    </div>
  );
};

export default GreetComponent;
