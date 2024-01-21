import { ThemeProvider } from '@mui/material';

const SecondarySidenavTheme = ({ theme, children }:any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default SecondarySidenavTheme;
