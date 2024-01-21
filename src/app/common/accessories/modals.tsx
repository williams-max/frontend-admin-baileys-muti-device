

/*
export const AlertSave = ({ title = "GUARDADO!", message = "Se ha Guardado la Receta!" }: any) => {

}*/

import { Button, Typography } from "@mui/material"
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
interface propsHead {
    title:any,
    handleAction: any,
}

export const ModalHead = ({title,handleAction}:any) => {
    return (
        <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
            backgroundColor: '#DC3545', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'
        }}>

            <Typography id="modal-modal-description" sx={{
                mt: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                marginLeft: '2%',//color:'white',

                fontSize: '0.9rem', //marginBottom: '10px'
            }}>
                {title}
            </Typography>
            <Button onClick={() => handleAction()}
                sx={{
                    color: 'black',
                    ':hover': {
                        color: 'white'
                    }
                }}
            >
                <CancelPresentationIcon
                />
            </Button>
        </div>
    )

}

