import { NavLink } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar.jsx";

function Navbar() {
  return (
    <section className="flex flex-row md:w-[90%] w-full mx-auto p-2 sticky justify-between h-[80px] items-center top-0 z-999">
      <NavLink to={"/"} className={"ul-logo-link"}>
        <span className="logo-span font-medium">TubeWatch</span>
      </NavLink>
      <SearchBar />
    </section>
  );
}

export default Navbar;
