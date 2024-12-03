import { Stack, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { colors } from "../../constant/colors.js";
import SearchBar from "../search-bar/SearchBar.jsx";

function Navbar() {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={2}
      sx={{
        position: "sticky",
        width: "100%",
        top: 0,
        zIndex: 999,
        background: colors.primary,
      }}
    >
      <NavLink to={"/"} className={"ul-logo-link"}>
        <span className="logo-span">JXMedia</span>
      </NavLink>
      <SearchBar />
      <Box />
    </Stack>
  );
}

export default Navbar;
