import { Typography } from "@mui/material"


export const messageEmpty = ({ message = "emty" }: any) => {
  return (
    <div style={{
      backgroundColor: `#DC3545`, padding: '0.5%', display: 'flex', flexDirection: 'row',
      justifyContent: 'space-between', borderRadius: '0px', marginTop: '1%'
      , alignItems: 'center'

    }}
    >

      <Typography variant="subtitle1" gutterBottom sx={{
        marginLeft: '15px',
        color: 'white', fontSize: '12px', fontFamily: 'Times New Roman'
      }} >
        {message}
      </Typography>


    </div>
  )
}




/*
referencia
 const AlertaGuardar = () => {
    Swal.fire(
      'GUARDADO!',
      'Se ha Guardado la Receta!',
      'success'
    )
  }
*/