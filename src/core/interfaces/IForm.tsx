export namespace IForm {
    export interface InputForm {
        label?: string,
        name?: string,
        register?: any,
        errors?: any,
        disabled?: boolean,
        autofocus?: boolean,
        showLabel?: boolean,
        onkeyEvent?: any,
        rows?: number,
        icon1?: string,
        icon2?: string
    }

    export interface InputFormFile {
        label?: string,
        register?: any,
        errors?: any,
        hide?: boolean
        changeEvent?: any,
        icon2?: string,
        type?: any
    }

    export interface ILightButton {
        title: string,
        icon?: string,
        action?: any,
        disabled?: boolean,
        fullWidth?: boolean
    }

    export interface SelectForm {
        label: string,
        register: any,
        errors?: any,
        autofocus?: boolean,
        children?: any
    }

    export interface ImputDate {
        label: string,
        errors?: any,
        control?: any,
        isRequired?: boolean,
        nameRegister: string
    }

    export interface ImputNumber {
        label: string,
        errors?: any,
        control?: any,
        isRequired?: boolean,
        isDisable?: boolean,
        nameRegister: string
    }
}