import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import FeeCalculator from "../pages/fee-calculator/page";
import EnergyRelease from "../pages/energy-release/page";
import DarkErg from "../pages/dark-erg/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/fee-calculator",
    element: <FeeCalculator />,
  },
  {
    path: "/energy-release",
    element: <EnergyRelease />,
  },
  {
    path: "/dark-erg",
    element: <DarkErg />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;