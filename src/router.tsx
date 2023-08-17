import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//홀덤 페이지

//메인페이지
const HomePage = Loader(lazy(() => import('src/content/home')));

const HoldemBase = Loader(lazy(() => import('src/content/holdem_base')));
const PokerCalPage = Loader(lazy(() => import('src/content/poker_cal')));
const HoldemPubPage = Loader(lazy(() => import('src/content/holdem_pub')));
const HoldemPubOnePage = Loader(
  lazy(() => import('src/content/holdem_pub/pub_page'))
);

//관리자

const Crypto = Loader(lazy(() => import('src/content/home')));

const StoreInfo = Loader(
  lazy(() => import('src/content/admin/storeInformation'))
);
const StoreInfoEdit = Loader(
  lazy(() => import('src/content/admin/storeInformation/storeEdit'))
);

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'holdem-base',
        element: <HoldemBase />,
      },
      {
        path: 'poker-cal',
        element: <PokerCalPage />,
      },
      {
        path: 'holdem-pub',
        element: <HoldemPubPage />,
      },
      {
        path: 'holdem-pub/detail/:id',
        element: <HoldemPubOnePage />,
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />,
          },
          {
            path: '404',
            element: <Status404 />,
          },
          {
            path: '500',
            element: <Status500 />,
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />,
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: '*',
        element: <Status404 />,
      },
    ],
  },
  {
    path: 'admin',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="storeInfo" replace />,
      },
      {
        path: 'storeInfo',
        element: <StoreInfo />,
      },
      {
        path: 'storeInfo/detail/:id',
        element: <StoreInfoEdit />,
      },
      {
        path: 'crypto2',
        element: <HoldemBase />,
      },
      {
        path: 'crypto3',
        element: <PokerCalPage />,
      },
      {
        path: 'crypto4',
        element: <HoldemPubPage />,
      },
    ],
  },
];

export default routes;
