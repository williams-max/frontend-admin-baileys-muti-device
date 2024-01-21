import { Button, Grid} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { ModalFormAdd } from './components/ModalFormAdd';

import { useMiDispositivo } from './services/useMiDispositivo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

import TablaInstancia from './components/TablaInstancia';

const MiDispositivo = () => {
  const { loadApiListInstances } = useMiDispositivo();
  const { register } = useForm();
  const [rows, setRows] = useState<any>([]);
  const [controlReload, setControlReload] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    loadInstancias();
  }
  useEffect(() => {
    // Update the document title using the browser API
    loadInstancias();
  }, [controlReload]);

  const handleChangeControlReload = () => {
    if (controlReload) {
      setControlReload(false)
      return;
    } else {
      setControlReload(true)
    }
  }
  const loadInstancias = async () => {
    try {
      const response = await loadApiListInstances();
      if (response?.error == false && response?.data) {
        setRows(response?.data)
      }
    } catch (error) {
    }
  }

  return (
    <div >
      <div>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
          <Grid item xs={12} sm={12} md={12}>
            <br />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleOpenModal} variant="outlined" >Agregar</Button>
            </div>
          </Grid>
        </Grid>
        <ToastContainer />
      </div>
      <TablaInstancia
        register={register}
        tableData={rows}
        handleChangeControlReload={handleChangeControlReload}
      />
      <ModalFormAdd
        openModalPersonalized={openModal}
        handleOpenModalPersonalized={handleOpenModal}
        handleCloseModalPersonalized={handleCloseModal}
        handleChangeControlReload={handleChangeControlReload}
      />
    </div>
  )
}

export default MiDispositivo