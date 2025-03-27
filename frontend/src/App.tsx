import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/public/Login";
import SignUp from "./pages/public/SignUp";
import { Toaster } from "./components/ui/toaster";
import Playlists from "./pages/auth/Playlists";
import { AuthProvider } from "./contexts/auth";

import { PrivateRouteWrapper } from "./components/custom/PrivateRoute";
import Musics from "./pages/auth/Musics";
import Generes from "./pages/auth/Genres";
import Artists from "./pages/auth/Artists";
import CreateEditArtist from "./pages/auth/CreateEditArtist";
import Test from "./pages/Test";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route element={<PrivateRouteWrapper token={token} />}>
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/musics" element={<Musics />} />
        <Route path="/genres" element={<Generes />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/:id" element={<CreateEditArtist />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
