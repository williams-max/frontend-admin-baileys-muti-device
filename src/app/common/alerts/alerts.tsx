import Swal from "sweetalert2"

export const AlertSave = ({ title = "GUARDADO!", message = "Se ha Guardado la Receta!" }: any) => {
    return (
        Swal.fire(
            title,//'GUARDADO!', // title
            message,//'Se ha Guardado la Receta!', // message
            'success'
        )
    )
}

export const AlertQuestion = ({ title = "GUARDADO!", message = "Se ha Guardado la Receta!" }: any) => {
  return (
    Swal.fire(
      title,  //title
      message,  //message
      'question'  // type
    )
  )
}

export const AlertError = ({ title = "", message = "Algo salió mal" }: any) => {
  return (
    Swal.fire({
      icon: 'error',
      title: 'Ups...',
      text: message,
      //footer: '<a href="">Why do I have this issue?</a>'
    })
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