import React from "react";

const Index = () => {

    const styles = {
        section: {
          fontSize: "18px",
          padding: "0 20px",
        },
        wrapper: {
          textAlign: "center",
          margin: "0 auto",
          marginTop: "50px"
        }
      }
  return (
    <section style={styles.section}>
      <div style={{color:"red",fontWeight:"bold"}}>Hello, We are learning methods of using css in react</div>
    </section>
  );
};

export default Index;
