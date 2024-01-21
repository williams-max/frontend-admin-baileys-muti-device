import axios from 'axios';
import ConfigSwisse from '../api/ConfigSwisse';

export const SaveFile = async (data: FormData) => {
    try {

        const response = axios
            .post(`${ConfigSwisse.urlapi}/api/File/SaveFile`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );

        let result = response
        return result;

    } catch (error) {
        console.log(error);
    }

}