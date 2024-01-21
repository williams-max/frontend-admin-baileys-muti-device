import { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
  Box,
  styled,
  useTheme
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import MatxMenu from '../../MatxMenu';
import MatxSearchBox from '../../MatxSearchBox';
//import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from '../../MatxTheme/themeColors';
//import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from '../../../contexts/NotificationContext';
//import { NotificationProvider } from 'app/contexts/NotificationContext';
import useAuth from '../../../hooks/useAuth';
//import useAuth from 'app/hooks/useAuth';
import useSettings from '../../../hooks/useSettings';
//import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from '../../../utils/constant';
//import { topBarHeight } from 'app/utils/constant';

import { Span } from '../../Typography';
//import { Span } from '../../Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';
import ShoppingCart from '../../ShoppingCart';

import ForumRoundedIcon from '@mui/icons-material/ForumRounded';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary }
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings: any) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            {/*<Icon>menu</Icon>*/}
            <MenuIcon />
          </StyledIconButton>

          <IconBox>
            <h3>Global</h3>
            {/*<StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>/*}

           {/*
             <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>
           <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>*/}
          </IconBox>
        </Box>

        <Box display="flex" alignItems="center">
          {/*<MatxSearchBox />*/}
     <NotificationBar />
         {/* <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>*/}

          <ForumRoundedIcon />
          {/* <ShoppingCart />*/}

          <MatxMenu
            menuButton={
              <UserMenu>
                {/*<Hidden xsDown>
                  <Span>
                    Hi <strong>{user.name}</strong>
                  </Span>
                </Hidden>*/}
                <Avatar src={user?.avatar} sx={{ cursor: 'pointer' }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Inicio </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Perfil </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Icon> settings </Icon>
              <Span> Ajustes </Span>
            </StyledItem>

            <StyledItem onClick={logout}>
              <Icon> power_settings_new </Icon>
              <Span> Cerrar sesión </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
