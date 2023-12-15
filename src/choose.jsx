import React from "react";
import { Link } from "react-router-dom";
import { BackgroundImage, Box, Center, Container, Image } from "@mantine/core";

const Choose = () => {
  return (
    <div  style={{ backgroundImage:"./background.png",width:screen,height:screen}}>
 <Container style={{ backgroundImage:"./background.png", margin: 0, maxWidth: "100%", maxHeight: "100%" }}>
      <BackgroundImage src="./background.png" radius="sm">
        <Center style={{ margin: 0 }}>
          <Image
            src="./hellogif.gif"
            style={{
              width: "400px",
              height: "400px",
              margin: 0,
              display: "block",
            }}
          />
        </Center>
        <Center style={{ margin: 0 }}>
          <Link
            id="button"
            to={"/login"}
            className="btn"
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              textDecoration: "none",
              margin: "5px",
              padding: "20px",
            }}
          >
            Click this For Admin
          </Link>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Center>
      </BackgroundImage>
    </Container>
    </div>
   
  );
};

export default Choose;
