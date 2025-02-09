import { NavLink } from "react-router";
import { Logo } from "./Logo";
import { ReactNode } from "react";
import {
  MdOutlineLibraryMusic,
  MdOutlinePersonSearch,
  MdOutlinePlayCircleOutline,
  MdPlaylistPlay,
} from "react-icons/md";

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
        ? "font-semibold text-teal-600 flex items-center gap-2"
        : "flex items-center gap-2 font-semibold hover:text-teal-600"
    }
  >
    {children}
  </NavLink>
);

const Drawer = () => {
  return (
    <nav className="max-w-[230px] w-full bg-white p-4">
      <Logo />
      <section className="pt-16 flex flex-col gap-8">
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
        <DrawerItem to="/generes">
          <MdOutlineLibraryMusic size={28} />
          Gêneros
        </DrawerItem>
      </section>
    </nav>
  );
};

export default Drawer;
