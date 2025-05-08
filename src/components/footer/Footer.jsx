import { Box, Typography } from "@mui/material";
import { colors } from "../../constant/colors";
function Footer() {
  return (
    <footer className="h-[80px] w-full bg-[#ece9df]">
      <Typography width={"100%"} height={"100%"}>
        <div className="w-full h-full flex justify-center items-center">
          <p className="font-bold">
            © 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </Typography>
    </footer>
  );
}

export default Footer;
