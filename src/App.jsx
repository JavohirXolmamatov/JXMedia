// import style
import "./App.css";

//import rrd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import pages
import Main from "./components/main/Main";
import ErrorPage from "./components/errorPage/ErrorPage";
import Channel from "./components/channel/Channel";
import Search from "./components/search/Search";
import VideoDetail from "./components/vedioDetail/VideoDetail";
import Videos from "./components/videos/Videos";

// import material UI
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Videos />,
        },
        {
          path: "/channel/:id",
          element: <Channel />,
        },
        {
          path: "video/:id",
          element: <VideoDetail />,
        },
        {
          path: "search/:id",
          element: <Search />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
