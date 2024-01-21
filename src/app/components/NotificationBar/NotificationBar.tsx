import {
  Badge,
  Button,
  Card,
  Drawer,
  Icon,
  IconButton,
  ThemeProvider,
  Box,
  styled,
  useTheme
} from '@mui/material';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import useNotification from '../../hooks/useNotification';
//import useNotification from 'app/hooks/useNotification';
import useSettings from '../../hooks/useSettings';
//import useSettings from 'app/hooks/useSettings';
import { sideNavWidth,topBarHeight } from '../../utils/constant';
//import { sideNavWidth, topBarHeight } from 'app/utils/constant';
import { getTimeDifference } from '../../utils/utils';
//import { getTimeDifference } from 'app/utils/utils.js';
import { themeShadows } from '../MatxTheme/themeColors';
import { Paragraph, Small } from '../Typography';

const Notification = styled('div')(() => ({
  padding: '16px',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  height: topBarHeight,
  boxShadow: themeShadows[6],
  '& h5': {
    marginLeft: '8px',
    marginTop: 0,
    marginBottom: 0,
    fontWeight: '500'
  }
}));

const NotificationCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:hover': {
    '& .messageTime': {
      display: 'none'
    },
    '& .deleteButton': {
      opacity: '1'
    }
  },
  '& .messageTime': {
    color: theme.palette.text.secondary
  },
  '& .icon': { fontSize: '1.25rem' }
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  opacity: '0',
  position: 'absolute',
  right: 5,
  marginTop: 9,
  marginRight: '24px',
  background: 'rgba(0, 0, 0, 0.01)'
}));

const CardLeftContent = styled('div')(({ theme }) => ({
  padding: '12px 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'rgba(0, 0, 0, 0.01)',
  '& small': {
    fontWeight: '500',
    marginLeft: '16px',
    color: theme.palette.text.secondary
  }
}));

const Heading = styled('span')(({ theme }) => ({
  fontWeight: '500',
  marginLeft: '16px',
  color: theme.palette.text.secondary
}));

const NotificationBar = ({ container }:any) => {
  const { settings } = useSettings();
  const theme = useTheme();
  const secondary = theme.palette.text.secondary;
  const [panelOpen, setPanelOpen] = useState(false);
  const { deleteNotification, clearNotifications, notifications } = useNotification();

  const handleDrawerToggle = () => {
    setPanelOpen(!panelOpen);
  };

  const { palette } = useTheme();
  const textColor = palette.text.primary;

  return (
    <Fragment>
      <IconButton onClick={handleDrawerToggle}>
        {/* <Badge color="secondary" badgeContent={notifications?.length}> */}
        <Badge color="secondary" >
          <Icon sx={{ color: textColor }}>notifications</Icon>
          {
            notifications && notifications.length > 0 ?
              <h5 style={{
                position: 'absolute', backgroundColor: 'red', color: 'white', borderRadius: 15,
                fontSize: '12px', padding: '2px', top: '-30px'
              }}>{notifications?.length}</h5> : null
          }
        </Badge>

       
      </IconButton>

      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Drawer
          width={'100px'}
          container={container}
          variant="temporary"
          anchor={'right'}
          open={panelOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
        >
          <Box sx={{ width: sideNavWidth }}>
            <Notification>
              <Icon color="primary">notifications</Icon>
              <h5>Notifications</h5>
            </Notification>

             {notifications?.map((notification:any,index: number) => (
              <NotificationCard key={index}>
                <DeleteButton
                  size="small"
                  className="deleteButton"
                  onClick={() => deleteNotification(notification.ID_VENTAS_NOTIFICACIONES)}
                >
                  <Icon className="icon">clear</Icon>
                </DeleteButton>
                <Link
                  to={`/${notification.path}`}
                  onClick={handleDrawerToggle}
                  style={{ textDecoration: 'none' }}
                >
                  <Card sx={{ mx: 2, mb: 3 }} elevation={3}>
                    <CardLeftContent>
                      <Box display="flex">
                        <Icon className="icon" color={'error'}>
                          {'chat'}{/*notification?.chat*/}
                        </Icon>
                        <Heading>{notification?.heading}</Heading>
                      </Box>
                      <Small className="messageTime">
                        {/*getTimeDifference(new Date(notification?.timestamp))*/}
                        {notification.FECHA_REGISTRO}
                      </Small>
                    </CardLeftContent>
                    <Box sx={{ px: 2, pt: 1, pb: 2 }}>
                      <Paragraph sx={{ m: 0 }}>{notification?.title}</Paragraph>
                      <Small sx={{ color: secondary }}>{notification?.MENSAJE}</Small> {/*subitutle*/}
                    </Box>
                  </Card>
                </Link>
              </NotificationCard>
            ))} 
            {!!notifications?.length && (
              <Box sx={{ color: secondary }}>
                <Button onClick={clearNotifications}>Eliminar Notificaciones</Button>
              </Box>
            )}
          </Box>
        </Drawer>
      </ThemeProvider>
    </Fragment>
  );
};

export default NotificationBar;
