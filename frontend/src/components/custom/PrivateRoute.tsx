import { Navigate, Outlet } from "react-router";
import Drawer from "./Drawer";

type PrivateRouteProps = {
  token: string | null;
  redirectPath?: string;
  children?: React.ReactNode;
};

export const PrivateRouteWrapper = ({
  token,
  redirectPath = "/",
}: PrivateRouteProps) => {
  return token ? (
    <div className="flex flex-1 bg-slate-100 w-screen h-screen">
      <Drawer />
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={redirectPath} />
  );

  return;
};
