import { toast } from 'react-toastify';

export const AlertToastError = ({ message = "error" }: any) => {
    toast.error(`${message}`)
}
export const AlertToastWarning = ({ message = "error" }: any) => {
    toast.warning(`${message}`)
}
export const AlertToastSuccess = ({ message = "error" }: any) => {
    toast.success(`${message}`)
}