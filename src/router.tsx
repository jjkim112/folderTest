import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

import SidebarLayout from "./layout/SideBarLayout";
import BaseLayout from "./layout/BaseLayout";

import SuspenseLoader from "./component/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//홀덤 페이지

//메인페이지
const HomePage = Loader(lazy(() => import("./page/home")));

const HoldemBase = Loader(
  lazy(() => import("./page/info/holdemRule/holdemRule"))
);
const HoldemUtil = Loader(lazy(() => import("./page/info/holdem_util")));
const PokerCalPage = Loader(
  lazy(() => import("./page/info/holdem_util/calculator/calculator"))
);
const HoldemPubPage = Loader(lazy(() => import("./page/pub/pubHome")));
const HoldemPubOnePage = Loader(lazy(() => import("./page/pub/pubDetail")));

//에러페이지
const Status404 = Loader(lazy(() => import("./page/status/Status404/index")));
const Status500 = Loader(lazy(() => import("./page/status/Status500/index")));
const StatusComingSoon = Loader(lazy(() => import("./page/status/ComingSoon")));
const StatusMaintenance = Loader(
  lazy(() => import("./page/status/Maintenance"))
);

const routes = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "overview",
        element: <Navigate to="/" replace />,
      },
      {
        path: "holdem-base",
        element: <HoldemBase />,
      },
      {
        path: "holdem-util",
        element: <HoldemUtil />,
      },
      {
        path: "poker-cal",
        element: <PokerCalPage />,
      },
      {
        path: "holdem-pub",
        element: <HoldemPubPage />,
      },
      {
        path: "holdem-pub/detail/:id",
        element: <HoldemPubOnePage />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
];

export default routes;
