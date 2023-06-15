import { Outlet, Route, Routes } from "react-router-dom";
import { Artist } from "./components/artist/Artist";
import { Login } from "./components/login/Login";
import { Album } from "./components/album/Album";
import { Navbar } from "./components/navbar/Navbar";



function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    );
  };


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />

        <Route path="/artist" element={<Artist />} />
        <Route path="/artist/:id/:name" element={<Album />} />
      </Route>

    </Routes>



  );
}

export default App;
