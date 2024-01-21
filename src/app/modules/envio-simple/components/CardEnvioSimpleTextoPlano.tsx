import { Typography, Button, TextField, Grid, Modal, Autocomplete, InputAdornment, FormGroup, Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Controller, useForm } from "react-hook-form";
import { AlertSave } from '../../../common/alerts/alerts';

import { useEnvioSimple } from '../services/useEnvioSimple';
import Select from "react-select";

import EmojiPicker, {
  EmojiStyle,
  EmojiClickData,
} from "emoji-picker-react"
import { hasFlag } from "country-flag-icons";
import { countries } from "countries-list";
import Flags from "country-flag-icons/react/3x2";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  //boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CardEnvioSimpleTextoPlano = () => {
  const { loadApiListInstances, loadApiEnviarMensajeSimple, loadApiGetAllGroups, loadApiSendMessage } = useEnvioSimple();
  const { formState, handleSubmit, control, register, getValues, setValue, unregister, reset } = useForm();

  const { errors } = formState
  const [listActivos, setListActivos] = useState<any>([])
  const [paisSelecionado, setPaisSelecionado] = useState<any>('');
  const [hiddengrupo, setHiddengrupo] = useState(false)
  const [ListaGrupos, setListaGrupos] = useState<any>([]);
  const [idSeleccionado, setIdSelecionado] = useState<any>('')

  useEffect(() => {
    loadInstancias();
  }, []);
  const loadInstancias = async () => {
    try {
      const response = await loadApiListInstances();
      if (response?.error == false && response?.data) {
        setListActivos(response?.data)
      }
    } catch (error) {

    }
  }

  const loadGetAllGroups = async (instance_key: string) => {
    try {
      const response = await loadApiGetAllGroups(instance_key);
      if (response.error == false
        && response?.instance_data
      ) {
        console.log(Object.values(response?.instance_data))
        setListaGrupos(Object.values(response?.instance_data));
      }
    } catch (error) {

    }
  }
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    const obteniendoValor = getValues('mensaje');
    if (obteniendoValor) {
      setValue('mensaje', getValues('mensaje') + emojiData.emoji)
    } else {
      setValue('mensaje', emojiData.emoji)
    }

    // setSelectedEmoji(emojiData.unified);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const InputTextFieldCustomAcce = ({ label, control, isRequired = false, nameRegister, isDisable, value }: any) => {
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

  const InputTextFieldCustomLong = ({ label, control, isRequired = false, nameRegister, isDisable }: any) => {
    return (
      <>
        <Typography variant="subtitle1" gutterBottom sx={{
          margin: 0, padding: 0, marginLeft: '3px',
          color: '#666666', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '3px'
        }}>
          {label}
        </Typography>
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
              multiline
              rows={5}

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

  const handleChangeInstance = async (item: any) => {
    await loadGetAllGroups(item.instance_key);
  }

  const enviarMensajeTexto = async (dataForm: any) => {
    const { check_grupo, grupo } = dataForm;
    console.log("data ",dataForm)

    if (!paisSelecionado.code && (check_grupo == false || check_grupo == undefined)) {
      return;
    }

    var temp_numero_phone = `${paisSelecionado.code}${dataForm.numero}`;
    if (check_grupo) {
      temp_numero_phone = grupo?.numero_grupo
    }
    try {

      if (check_grupo == false || check_grupo == undefined) {

        const responseMessageText = await loadApiEnviarMensajeSimple(dataForm.nombre_instancia.instance_key
          , temp_numero_phone, dataForm.mensaje
        );

        if (responseMessageText?.error == false) {
          AlertSave({ title: "", message: "Enviado Correctamente" });
        }
      }
      else {

        const responseMessage = await loadApiSendMessage(dataForm.nombre_instancia.instance_key
          , idSeleccionado, dataForm.mensaje
        );
        if (responseMessage?.error == false) {
          AlertSave({ title: "", message: "Enviado Correctamente" });
        }

      }

    } catch (error) {
  console.log("error----------> ",error)
    }

  }

  const options = Object.entries(countries)
    .map((code) => {
      const exist = hasFlag(code[0]);

      if (!exist) {
        return undefined;
      }
      const Component = Flags[code[0]];
      return {
        value: code[1].name,
        code: code[1].phone,
        title: code[0],
        info: code[1],
        label: (
          <>
            <Component
              title={code[0]}
              style={{ display: "inline-block", height: "1em", width: "1em" }}
            />
            &nbsp;
            <span>{`${code[1].name} ${code[1].phone}`}</span>
          </>
        )
      };
    })
    .filter(Boolean);

  const handleChangeContry = (country: any) => {
    setPaisSelecionado(country)
  }


  const hadleChangeCheked = async (estado: boolean) => {
    setHiddengrupo(!!estado);
    setValue(`check_grupo`, !!estado)
  }
  return (
    <div>
      <Box
        sx={{ flexGrow: 1, display: 'flex', width: '100%' }}
      >
        <Box sx={{ flexGrow: 2 }} >
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }} >

            <>
              <Grid item xs={12} sm={12} md={6}>

                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Seleccionar dispositivo</h6>
                  </div>
                  <Controller
                    control={control}
                    name="nombre_instancia"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={listActivos}
                        sx={{ width: '100%' }}
                        onChange={(event, item) => {
                          handleChangeInstance(item)
                          onChange(item)

                        }
                        }

                        value={value}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Seleccionar dispositivo"
                            error={!!errors.nombre_instancia}
                            helperText={errors.nombre_instancia && "Completa este campo"}
                          //  required

                          />
                        )}

                        getOptionLabel={(option: any) => option.instance_key}

                      />
                    )}
                  />

                </div>
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Enviar mensaje a un grupo</h6>
                  </div>
                  <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>

                    <Controller
                      name={`check_grupo`}
                      control={control}
                      render={({ field: props }: any) => (
                        <Checkbox
                          {...props}
                          sx={{ padding: 0, margin: 0 }}
                          size="small"
                          checked={!!props.value}
                          onChange={(e: any) => hadleChangeCheked(e.target.checked)} />
                      )}
                    />

                  </FormGroup>
                </div>

              </Grid>
              <Grid item xs={12} sm={12} md={6}>

                {hiddengrupo ?
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Seleccione grupo</h6>

                    </div>
                    <Controller
                      control={control}
                      name="grupo"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={ListaGrupos}
                          sx={{ width: '100%' }}
                          onChange={(event, item) => {
                            onChange(item)
                            setIdSelecionado(item?.id)

                          }
                          }

                          value={value}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              label="Seleccione grupo"
                              error={!!errors.grupo}
                              helperText={errors.grupo && "Completa este campo"}
                            />
                          )}
                          getOptionLabel={(option: any) => option.subject}
                        />
                      )}
                    />
                  </div> : null
                }
                {
                  hiddengrupo == false ?
                    <>

                      <h6 style={{ padding: '0px', margin: '0px', fontSize: '12px' }}>Seleccione Pais</h6>

                      <div>
                        <Select
                          // isMulti={true}
                          isClearable={true}
                          isSearchable={true}
                          isDisabled={false}
                          name="colors"
                          options={options}
                          onChange={handleChangeContry}
                          classNamePrefix="select"

                        />
                      </div>
                      <br /><br />
                      <h5 style={{ padding: '0px', margin: '0px', marginBottom: '5px' }}>Número destinatario:</h5>
                      <InputTextFieldCustomAcce
                        label={'Número destinatario'}
                        control={control}
                        isRequired={true}
                        nameRegister={'numero'}
                      />
                    </> : null
                }
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Button onClick={handleOpen}>Emoji</Button>
                <InputTextFieldCustomLong
                  label={'Mensaje'}
                  control={control}
                  isRequired={true}
                  nameRegister={'mensaje'}
                />
              </Grid>
              <br /><br />
              <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px', marginLeft: '20px' }}>
                <Button onClick={handleSubmit(enviarMensajeTexto)} variant="outlined" >Enviar Mensaje</Button>
              </div>
            </>
          </Grid>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <EmojiPicker
            onEmojiClick={onClick}
            autoFocusSearch={false}
            emojiStyle={EmojiStyle.NATIVE}
          />

        </Box>
      </Modal>
    </div>
  )
}

export default CardEnvioSimpleTextoPlano