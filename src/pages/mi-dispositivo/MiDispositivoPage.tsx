
//import RecetaCombo from '../../app/modules/receta/RecetaCombo';
import MiDispositivo from '../../app/modules/mi-dispositivo/MiDispositivo';

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

const MiDispositivoPage = () => {
    return (
        <Container>
            <MiDispositivo/>
        </Container>
    )
}

export default MiDispositivoPage;
