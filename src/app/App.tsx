import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import { NotificationProvider } from './contexts/NotificationContext';

import './fake-db';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
      <NotificationProvider>
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
        </NotificationProvider>
      </AuthProvider>
    </SettingsProvider>
  );
};
/*
<SettingsProvider>
<AuthProvider>
  <MatxTheme>
    <CssBaseline />
    {content}
  </MatxTheme>
</AuthProvider>
</SettingsProvider>
*/
export default App;
