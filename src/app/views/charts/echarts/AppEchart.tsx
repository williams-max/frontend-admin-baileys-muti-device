import { Box, styled, useTheme } from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumb';
//import Breadcrumb from 'app/components/Breadcrumb';
import SimpleCard from '../../../components/SimpleCard';
//import InventarioCierre from '../../../modules/inventario-cierre/InventarioCierre';
//import SimpleCard from 'app/components/SimpleCard';
import AreaChart from './AreaChart';
import ComparisonChart from './ComparisonChart';
import DoughnutChart from './Doughnut';
import LineChart from './LineChart';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px'
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px'
    }
  }
}));

const AppEchart = () => {
  const theme = useTheme();
  return (
    <Container>
      <InventarioCierre/>
      <div>AppEchart </div>
    </Container>
  );
};

export default AppEchart;
