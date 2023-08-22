import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import AdminPage from './content/admin';

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

//관리자 매장

const Crypto = Loader(lazy(() => import('src/content/home')));

const StoreInfo = Loader(
  lazy(() => import('src/content/admin/storeInformation'))
);
const StoreInfoDetail = Loader(
  lazy(() => import('src/content/admin/storeInformation/storeEdit'))
);
const StoreInfoDetailEdit = Loader(
  lazy(
    () => import('src/content/admin/storeInformation/storeEdit/storeEditMain')
  )
);
const StoreInfoEdit = Loader(
  lazy(() => import('src/content/admin/storeInformation/storeInfoEdit'))
);

//관리자 손님

const GuestInfo = Loader(
  lazy(() => import('src/content/admin/guestInformation'))
);
const GuestInfoDetail = Loader(
  lazy(() => import('src/content/admin/guestInformation/guestInfoEditMain'))
);

const GuestInfoEdit = Loader(
  lazy(() => import('src/content/admin/guestInformation/guestInfoEditMain'))
);

//에러페이지
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
        // element: <Navigate to="storeInfo" replace />,
        element: <AdminPage />,
      },
      {
        path: 'storeInfo',
        element: <StoreInfo />,
      },
      {
        path: 'storeInfo/detail/:id',
        element: <StoreInfoDetail />,
      },
      {
        path: 'storeInfo/edit/:id',
        element: <StoreInfoDetailEdit />,
      },
      {
        path: 'storeInfoEdit',
        element: <StoreInfoEdit />,
      },
      {
        path: 'guestInfo',
        element: <GuestInfo />,
      },
      {
        path: 'guestInfo/detail/:id',
        element: <GuestInfoDetail />,
      },
      {
        path: 'guestInfoEdit',
        element: <GuestInfoEdit />,
      },
    ],
  },
];

export default routes;
