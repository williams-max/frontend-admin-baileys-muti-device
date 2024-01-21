
import AplicationConnect from "../../../../core/api/AplicationConnect"


export const useMiDispositivo = () => {
  
    const loadApiCreateInstance = async (nombre_instancia: string) => {
        try {
            // instance/init?key=admin1&id_usuario=1
            const respuesta = await AplicationConnect.get<any>(`/instance/init?key=${nombre_instancia}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    const loadApiGetQrBase64 = async (nombre_instancia: string) => {
        try {
           
            const respuesta = await AplicationConnect.get<any>(`/instance/qrbase64?key=${nombre_instancia}`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


  
    const loadApiDeleteInstance = async (key: string) => {
        try {
            const respuesta = await AplicationConnect.delete<any>(`/instance/delete?key=${key}`)
            await loadApiLogoutInstance (key)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }
    
    const loadApiLogoutInstance = async (key: string) => {
        try {
            const respuesta = await AplicationConnect.delete<any>(`/instance/logout?key=${key}`)
            return respuesta.data
        } catch (error) {
            console.log(error)
        }

    }


    const loadApiListInstances = async () => {
        try {
    
            const respuesta = await AplicationConnect.get<any>(`/instance/list`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }


    return {
        
        loadApiCreateInstance,
        loadApiListInstances,
        loadApiDeleteInstance,
        loadApiLogoutInstance,
        loadApiGetQrBase64,
    }
}
