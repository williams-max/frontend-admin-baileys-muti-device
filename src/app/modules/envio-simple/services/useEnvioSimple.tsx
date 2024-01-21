
import AplicationConnect from "../../../../core/api/AplicationConnect"

export const useEnvioSimple = () => {


    const loadApiListInstances = async () => {
        try {
            // instance/init?key=admin1&id_usuario=1
            const respuesta = await AplicationConnect.get<any>(`/instance/list`)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    const loadApiGetAllGroups = async (instance_key : string) => {
        try {
            // {{baseUrl}}/group/getallgroups?key={{instance_key}}
            const respuesta = await AplicationConnect.get<any>(`/group/getallgroups?key=${instance_key}`)
            console.log("aaaa ",respuesta.data)
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    const loadApiEnviarMensajeSimple = async (nombreSession:string,numberPhone:string,mensaje:string) => {
        try {
            console.log(numberPhone)
            // instance/init?key=admin1&id_usuario=1 ContactTypeGet
            const respuesta = await AplicationConnect.post<any>(`/message/contact?key=${nombreSession}`,{
                "number": numberPhone,
                "message": mensaje
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    
    const loadApiSendMessage = async (instance_key:string,id:string,mensaje:string) => {
        try {

            // {{baseUrl}}/message/text?key={{instance_key}}
            const respuesta = await AplicationConnect.post<any>(`/message/text?key=${instance_key}`,{
                "id": id,
                "message": mensaje
            })
            return respuesta.data

        } catch (error) {
            console.log(error)
        }

    }

    return {
        
        loadApiListInstances,
        loadApiGetAllGroups,
        loadApiSendMessage,
        loadApiEnviarMensajeSimple

    }
}
