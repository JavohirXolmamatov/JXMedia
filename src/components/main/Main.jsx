import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { colors } from "../../constant/colors";
function Main() {
  return (
    <div className="w-full mx-auto">
      <header
        style={{
          boxShadow: "0px 2px 30px 0px rgba(34, 60, 80, 0.43)",
          background: colors.primary,
        }}
        className="w-full mx-auto fixed top-0 left-0 z-99"
      >
        <Navbar />
      </header>
      <main className="w-[100%] mx-auto mt-[80px] min-h-screen">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Main;
