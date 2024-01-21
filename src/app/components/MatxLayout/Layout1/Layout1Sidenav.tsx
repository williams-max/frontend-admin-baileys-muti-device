import { memo } from 'react';
import { Hidden, Switch, Box, styled, useTheme } from '@mui/material';
import { themeShadows } from '../../MatxTheme/themeColors';
//import { themeShadows } from 'app/components/MatxTheme/themeColors';
import useSettings from '../../../hooks/useSettings';
//import useSettings from 'app/hooks/useSettings';
import { convertHexToRGB } from '../../../utils/utils';
//import { convertHexToRGB } from 'app/utils/utils';
import { sidenavCompactWidth, sideNavWidth } from '../../../utils/constant';
//import { sidenavCompactWidth, sideNavWidth } from 'app/utils/constant';
import Brand from '../../Brand';
//import Brand from '../../Brand';
import Sidenav from '../../Sidenav';

const SidebarNavRoot = styled(Box)(({ theme, width, bg, image }: any) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: width,
  boxShadow: themeShadows[8],
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  zIndex: 111,
  overflow: 'hidden',
  color: theme.palette.text.primary,
  transition: 'all 250ms ease-in-out',
 // backgroundImage: `linear-gradient(to bottom, rgba(${bg}, 0.96), rgba(${bg}, 0.96)), url(${image})`,
  backgroundImage: `linear-gradient(to bottom, rgba(${bg}, 0.96), rgba(${bg}, 0.96)), url(${image})`,
  '&:hover': {
    width: sideNavWidth,
    '& .sidenavHoverShow': { display: 'block' },
    '& .compactNavItem': {
      width: '100%',
      maxWidth: '100%',
      '& .nav-bullet': { display: 'block' },
      '& .nav-bullet-text': { display: 'none' }
    }
  }
}));

const NavListBox = styled(Box)({
  height: '100%',
  display: 'flex',
 // overflowY:'scroll',
  flexDirection: 'column'
});

/*
const NavListBox = styled(Box)({
  height: '100%',
  display: 'flex',
  //  overflowY:'scroll',
  //  scrollbarWidth: 'thin',
  flexDirection: 'column'
});
*/

const Layout1Sidenav = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode, bgImgURL } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case 'compact':
        return sidenavCompactWidth;

      default:
        return sideNavWidth;
    }
  };

  const primaryRGB = convertHexToRGB(theme.palette.primary.main);

  const updateSidebarMode = (sidebarSettings: any) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' });
  };

  const imgEmpresa = "https://sistemageneral.azurewebsites.net/assets/dist/img/logo.png"
  //bgImgURL

  console.log('imagen ',bgImgURL)
  return (
    <SidebarNavRoot image={bgImgURL} bg={primaryRGB} width={getSidenavWidth()}>

      <NavListBox>
        <Brand>
          <Hidden smDown>
            <Switch
              onChange={handleSidenavToggle}
              checked={leftSidebar.mode !== 'full'}
              color="secondary"
              size="small"
            />
          </Hidden>
        </Brand>
        <Sidenav />
      </NavListBox>

    </SidebarNavRoot>
  );
};

export default memo(Layout1Sidenav);

/*


  <SidebarNavRoot image={bgImgURL} bg={primaryRGB} width={getSidenavWidth()}>
      <NavListBox>
        <Brand>
          <Hidden smDown>
            <Switch
              onChange={handleSidenavToggle}
              checked={leftSidebar.mode !== 'full'}
              color="secondary"
              size="small"
            />
          </Hidden>
        </Brand>
        <Sidenav />
      </NavListBox>
    </SidebarNavRoot>
*/