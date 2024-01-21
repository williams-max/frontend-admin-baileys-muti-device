import { CssBaseline, ThemeProvider } from '@mui/material';
import useSettings from '../../hooks/useSettings';
//import useSettings from 'app/hooks/useSettings';

const MatxTheme = ({ children }:any) => {
  const { settings } = useSettings();
  let activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MatxTheme;
