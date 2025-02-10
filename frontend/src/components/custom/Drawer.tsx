import { NavLink } from "react-router";
import { Logo } from "./Logo";
import { ReactNode, useContext } from "react";
import {
  MdOutlineLibraryMusic,
  MdOutlinePersonSearch,
  MdOutlinePlayCircleOutline,
  MdPlaylistPlay,
} from "react-icons/md";
import AuthContext from "@/contexts/auth";

const DrawerItem = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode | ReactNode[];
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "font-semibold text-teal-600 flex items-center gap-2 text-lg"
        : "flex items-center gap-2 font-semibold hover:text-teal-600 text-lg"
    }
  >
    {children}
  </NavLink>
);

const Drawer = () => {
  const authContext = useContext(AuthContext);
  console.log({ authContext });
  return (
    <nav className="max-w-[230px] w-full bg-white p-4">
      <div className="flex flex-col h-full justify-between">
        <div>
          <Logo />
          <section className="pt-16 flex flex-col gap-10">
            <DrawerItem to="/playlists">
              <MdPlaylistPlay size={28} />
              Playlists
            </DrawerItem>
            <DrawerItem to="/musics">
              <MdOutlinePlayCircleOutline size={28} />
              Músicas
            </DrawerItem>
            <DrawerItem to="/artists">
              <MdOutlinePersonSearch size={28} />
              Artistas
            </DrawerItem>
            <DrawerItem to="/genres">
              <MdOutlineLibraryMusic size={28} />
              Gêneros
            </DrawerItem>
          </section>
        </div>
        {/* <div>{authContext?.user?.name}</div> */}
      </div>
    </nav>
  );
};

export default Drawer;
