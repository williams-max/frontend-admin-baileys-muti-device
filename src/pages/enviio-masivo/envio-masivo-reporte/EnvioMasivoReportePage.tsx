
//import RecetaCombo from '../../app/modules/receta/RecetaCombo';
import EnvioMasivoReporte from '../../../app/modules/envio-masivo/envio-masivo-reporte/EnvioMasivoReporte';


import {  styled} from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    margin: '10px',
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

const EnvioMasivoReportePage = () => {
    return (
        <Container>
           <EnvioMasivoReporte/>
        </Container>
    )
}

export default EnvioMasivoReportePage;
