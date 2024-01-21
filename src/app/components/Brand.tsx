import { Box, styled } from '@mui/material';
import MatxLogo from './MatxLogo';

import useAuth from '../hooks/useAuth';
//import { MatxLogo } from 'app/components';
import useSettings from '../hooks/useSettings';
//import useSettings from 'app/hooks/useSettings';
import { Span } from './Typography';
import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 18px 20px 29px',
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: '.5rem',
  display: mode === 'compact' ? 'none' : 'block',
}));

const Brand = ({ children }: any) => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        <StyledSpan mode={mode} className="sidenavHoverShow">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AccountCircleIcon sx={{}} />
             <h6 style={{ marginLeft: '10px' }}>{user?.email} </h6>
          </div>
        </StyledSpan>
      </Box>

      <Box className="sidenavHoverShow" sx={{ display: mode === 'compact' ? 'none' : 'block' }}>
        {children || null}
      </Box>
    </BrandRoot>
  );
};

export default Brand;

