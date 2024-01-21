import { Typography, Button, TextField, Grid, Modal, Autocomplete } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CardEnvioSimpleTextoPlano from './components/CardEnvioSimpleTextoPlano';
import CardEnvioSimpleTextoMutimedia from './components/CardEnvioSimpleTextoMutimedia';
const EnvioSimple = () => {
  const [colorBtnControl, setColorBtnControl] = useState({
    btn1: true, // envio siemple
    btn2: false,// multmedia
  })
  const paitButtomHandle = (valor: any) => {
    if (valor)
      return { backgroundColor: '#C7C7C7' }
    else
      return null
  }
  return (
    <div >
      
      <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '15px', color: 'black' }} >
        Redactar mensaje
      </Typography>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
        <Grid item xs={12} sm={4} md={4}>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '5%' }}>
            <Button sx={{ ...paitButtomHandle(colorBtnControl.btn1) }} variant="outlined"
              onClick={() => setColorBtnControl({
                btn1: true, // envio siemple
                btn2: false,// multmedia
              })}
            >Texto plano</Button>
            <br />
            <Button sx={{ ...paitButtomHandle(colorBtnControl.btn2) }} variant="outlined"
              onClick={() => setColorBtnControl({
                btn1: false, // envio siemple
                btn2: true,// multmedia
              })}>Texto multimedia</Button>
            <br />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          {colorBtnControl.btn1 ? <CardEnvioSimpleTextoPlano /> : null}
          {colorBtnControl.btn2 ? <CardEnvioSimpleTextoMutimedia/> : null}
        </Grid>
      </Grid>
    
    </div>
  )
}
export default EnvioSimple