import { TextField, Typography, InputAdornment } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useState } from 'react';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

//clientes
export const InputTextFieldCustomWithIcon = ({ label, control, isRequired = false, nameRegister, isDisable, iconButton }: any) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                {label}
            </Typography>
            <Controller
                name={nameRegister}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField id="outlined-basic" label={label}
                        variant="outlined" sx={{
                            width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='end'>
                                    {iconButton}
                                </InputAdornment>
                            )
                        }}
                    />
                )}

                rules={{
                    required: {
                        value: isRequired,
                        message: 'Completa este campo '
                    },
                    /*maxLength: {
                        value: 3,
                        message: 'requiere maximo 3 caracteres'
                    }*/
                }}
            />
        </div>
    )
}


export const InputTextFieldPasswordWithIcon = ({ label, control, isRequired = false, nameRegister, isDisable }: any) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {

        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Typography variant="subtitle1" gutterBottom sx={{
                color: '#666666',
                fontSize: '14px'
            }} >
                {label}
            </Typography>
            <Controller
                name={nameRegister}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField id="outlined-basic" label={label}
                        variant="outlined" sx={{
                            width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"

            
                        type={showPassword ? 'text' : 'password'}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>

                                    {showPassword ? <RemoveRedEyeIcon onClick={() => handleClickShowPassword()}
                                    /> : <VisibilityOffIcon onClick={() => handleClickShowPassword()} />}
                                </InputAdornment>
                            )
                        }}
                    />
                )}

                rules={{
                    required: {
                        value: isRequired,
                        message: 'Completa este campo '
                    }
                }}
            />
        </div>
    )
}



/*
export const InputTextFieldCustomWithIcon = ({ label, control, isRequired = false, nameRegister, isDisable, iconButton }: any) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#666666' }}>
                {label}
            </Typography>
            <Controller
                name={nameRegister}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField id="outlined-basic" label={label}
                        variant="outlined" sx={{
                            width: '100%',
                        }}
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        size="small"

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='end'>
                                    {iconButton}
                                </InputAdornment>
                            )
                        }}
                    />
                )}

                rules={{
                    required: {
                        value: isRequired,
                        message: 'Completa este campo '
                    },
           
                }}
            />
        </div>
    )
}

*/