
import { Typography, Button, Collapse, TextField, Modal, Checkbox, Autocomplete, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form";
import { AlertError, AlertQuestion, AlertSave } from '../../../common/alerts/alerts';
import Box from '@mui/material/Box';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useMiDispositivo } from '../services/useMiDispositivo';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'left',
    //color: theme.palette.text.secondary,
}));
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    //border: '2px solid #000',
    boxShadow: 24,
    //p: 2,
};

export const ModalFormAdd = (props: any) => {
    const { formState, handleSubmit, register, getValues, setValue, unregister, reset, control } = useForm();
  
    const { openModalPersonalized, handleOpenModalPersonalized,
        handleCloseModalPersonalized
        , handleChangeControlReload } = props;

    const { loadApiCreateInstance, loadApiGetQrBase64 } = useMiDispositivo();
    const [nombreInstancia, setNombreInstancia] = useState('')
    const [imagenBase64, setimagenBase64] = useState('https://w7.pngwing.com/pngs/395/283/png-transparent-empty-set-null-set-null-sign-mathematics-mathematics-angle-logo-number.png')



    const onSubmit = async (dataForm: any) => {
        const response = await loadApiCreateInstance(dataForm.instancia_key);
        setNombreInstancia(dataForm.instancia_key)
        if (response?.error == false) {
            AlertSave({ title: "", message: "Ahora presiona el boton actulizar QR" });
            const responseBase64 = await loadApiGetQrBase64(dataForm.instancia_key);
            console.log("res base 64 ", responseBase64)
        }
    }

    const obtenerImagenQr = async () => {
        const responseBase64 = await loadApiGetQrBase64(nombreInstancia)
        console.log("res base 64 ", responseBase64)
        setimagenBase64(responseBase64?.qrcode)

    }

    const closeModalResetForm = () => {

        reset({});
        //rows([]);
        handleCloseModalPersonalized()
    }

  

    const InputTextFieldCustomNormal = ({ label, control, isRequired = false, nameRegister, isDisable, value }: any) => {
        return (
            <>
                <Controller
                    name={nameRegister}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField id="outlined-basic" label={label}
                            variant="outlined"
                            sx={{
                                width: '100%',
                            }}
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            size="small"


                        />
                    )}

                    rules={{
                        required: {
                            value: isRequired,
                            message: 'Completa este campo '
                        },
                    }}
                />
            </>
        )
    }

    return (
        <>
            <Modal
                open={openModalPersonalized}
                onClose={handleCloseModalPersonalized}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        backgroundColor: 'white', borderTopLeftRadius: '8px', borderTopRightRadius: '8px'
                    }}>

                        <Typography id="modal-modal-description" sx={{
                            mt: 1,
                            textAlign: 'center',
                            //fontWeight: 'bold',
                            marginLeft: '2%',
                            color: 'black',
                            fontSize: '0.9rem', //marginBottom: '10px'
                        }}>
                            Crear instanacia
                        </Typography>
                        <Button onClick={() => closeModalResetForm()}
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
                    <div style={{ margin: '15px' }}>

                        <div style={{ width: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Nombre</h6>
                            </div>
                            <InputTextFieldCustomNormal
                                label={'Nombre Instancia'}
                                control={control}
                                isRequired={true}
                                nameRegister={'instancia_key'}
                            />
                        </div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        &nbsp; &nbsp;
                        <Button onClick={handleSubmit(onSubmit)} variant="contained" >Crear</Button>
                        &nbsp; &nbsp;
                    </div>
                    <br />
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} >
                        <>
                            <Grid item xs={12} sm={12} md={12} >
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    &nbsp; &nbsp;
                                    <Button onClick={() => obtenerImagenQr()} variant="outlined" >Actulizar QR</Button>
                                    &nbsp; &nbsp;
                                </div>
                                <Item style={{ alignItems: 'left' }}> {/*hoa*/}
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs >
                                            <center>
                                                <img
                                                    //src={state.base64URL}
                                                    src={imagenBase64}
                                                    id="nuevaImagen"
                                                    className="img-thumbnail previsualizar"
                                                    alt="not found"
                                                    width="60%"
                                                />
                                            </center>
                                            <br /><br />
                                        </Grid>
                                    </Grid>
                                </Item>

                            </Grid>
                        </>

                    </Grid>

                </Box>
            </Modal>
        </>
    )
}
