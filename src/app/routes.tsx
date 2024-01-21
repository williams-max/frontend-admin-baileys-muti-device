import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import MiDispositivoPage from '../pages/mi-dispositivo/MiDispositivoPage';
import EnvioSimplePage from '../pages/envio-simple/EnvioSimplePage';

//import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('./views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('./views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('./views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('./views/sessions/ForgotPassword')));
// echart page
const AppEchart = Loadable(lazy(() => import('./views/charts/echarts/AppEchart')));
// dashboard page
const Analytics = Loadable(lazy(() => import('./views/dashboard/Analytics')));

// rutas recetasde
const testRoutes = [ 
  { path: '/mensajes', element: <EnvioSimplePage /> },
  { path: '/instancias', element: <MiDispositivoPage /> }


];

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...testRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  //{ path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/', element: <Navigate to="instancias" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
