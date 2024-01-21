import { Button, TextField, Grid, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Controller, useForm } from "react-hook-form";
import { AlertSave } from '../../../common/alerts/alerts';
import { useEnvioSimple } from '../services/useEnvioSimple';
import axios from 'axios';

import ConfigSwisse from '../../../../core/api/ConfigSwisse';
import Select from "react-select";
import { hasFlag } from "country-flag-icons";
import { countries } from "countries-list";
import Flags from "country-flag-icons/react/3x2";

const CardEnvioSimpleTextoMutimedia = () => {

  const urlApiWhatsapp = ConfigSwisse.urlApiWhatsapp;
  const { loadApiListInstances } = useEnvioSimple();

  const { formState, handleSubmit, control } = useForm();

  const { errors } = formState
  const [listActivos, setListActivos] = useState<any>([])
  const [archivo, setArchivo] = useState('')


  const [paisSelecionado, setPaisSelecionado] = useState<any>('');


  useEffect(() => {
    // Update the document title using the browser API
    loadInstancias();
  }, []);



  const options = Object.entries(countries)
    .map((code) => {
      const exist = hasFlag(code[0]);

      if (!exist) {
        return undefined;
      }

      const Component: any = Flags[code[0]];
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

  const loadInstancias = async () => {
    try {
      const response = await loadApiListInstances();
      if (response?.error == false && response?.data) {
        var temp_dispositivos_activos = response?.data.filter((x: any) => (x.phone_connected == true))
        setListActivos(temp_dispositivos_activos)
      }
    } catch (error) {

    }
  }

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


  const handleFileInputChange = async (e: any) => {
    setArchivo(e.target.files[0])
  };


  const enviarArchivo = async (dataForm: any) => {

    const nombreSession = dataForm.nombre_instancia.instance_key;

    const numberPhone = dataForm.numero;

    if (!paisSelecionado.code) {
      return;
    }

    var file: any = archivo;

    if (!file) {
      return;
    }

    var typeFile = file.type;
    const identificador = `${paisSelecionado.code}${numberPhone}@s.whatsapp.net`;

    try {

      if (typeFile == "image/jpeg" || typeFile == "image/png" || typeFile == "image/jpg") {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('id', identificador);
        formData.append('caption', 'test');

        const responseMessageText: any = await axios.post(
          `${urlApiWhatsapp}/message/image?key=${nombreSession}`,
          formData
        )
        if (responseMessageText?.data?.error == false) {
          AlertSave({ title: "", message: "Enviado Correctamente" });
        }
        return;

      }

      if (typeFile == "audio/mpeg") {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('id', identificador);
        const responseMessageText: any = await axios.post(
          `${urlApiWhatsapp}/message/audio?key=${nombreSession}`,
          formData
        )


        if (responseMessageText?.data?.error == false) {
          AlertSave({ title: "", message: "Enviado Correctamente" });
        }
        console.log("res audio", responseMessageText)
        return;

      }

      if (typeFile == "video/mp4") {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('id', identificador);
        formData.append('caption', 'test');

        const responseMessageText: any = await axios.post(
          `${urlApiWhatsapp}/message/video?key=${nombreSession}`,
          formData
        )

        if (responseMessageText?.data?.error == false) {
          AlertSave({ title: "", message: "Enviado Correctamente" });
        }
        return;
      }

      if (typeFile == "application/pdf"
        ||
        typeFile == "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        || typeFile == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('id', identificador);
        formData.append('caption', 'test');

        const responseMessageText: any = await axios.post(
          `${urlApiWhatsapp}/message/doc?key=${nombreSession}`,
          formData
        )
        if (responseMessageText?.data?.error == false) {
          AlertSave({ title: "", message: "Enviado Correctamente" });
        }
        console.log("res doc", responseMessageText)
        return;

      } else {
        alert("no existe el formato establecido")
      }
    } catch (error) {

    }
  }

  return (
    <>
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
                          />
                        )}
                        getOptionLabel={(option: any) => option.instance_key}
                      />
                    )}
                  />

                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>



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
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <div>
                  <input type="file" name="file" onChange={handleFileInputChange} />
                </div>
              </Grid>
              <br /><br />
              <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px', marginLeft: '20px' }}>
                <Button onClick={handleSubmit(enviarArchivo)} variant="outlined" >Enviar Mensaje</Button>
              </div>
            </>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default CardEnvioSimpleTextoMutimedia