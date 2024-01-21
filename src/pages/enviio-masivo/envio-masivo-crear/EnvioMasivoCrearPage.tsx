
//import RecetaCombo from '../../app/modules/receta/RecetaCombo';
import EnvioMasivoCrear from '../../../app/modules/envio-masivo/envio-masivo-crear/EnvioMasivoCrear';


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

const EnvioMasivoPage = () => {
    return (
        <Container>
           <EnvioMasivoCrear/>
        </Container>
    )
}

export default EnvioMasivoPage;
