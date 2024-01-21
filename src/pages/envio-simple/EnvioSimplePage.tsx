
import EnvioSimple from '../../app/modules/envio-simple/EnvioSimple';

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

const EnvioSimplePage = () => {
    return (
        <Container>
           <EnvioSimple/>
        </Container>
    )
}

export default EnvioSimplePage;
