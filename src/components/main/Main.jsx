import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Box, Container, Typography } from "@mui/material";
function Main() {
  return (
    <div>
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: "99",
          boxShadow: "0px 2px 30px 0px rgba(34, 60, 80, 0.43)",
        }}
      >
        <Navbar />
      </header>
      <Box p={2} sx={{}}>
        <Container maxWidth={"90% "}>
          <Outlet />
        </Container>
      </Box>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Main;
