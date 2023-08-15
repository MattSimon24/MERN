/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

type TextInputFieldProps = {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
}

const TextInputField = ({ name, label, register, registerOptions, error, ...props }: TextInputFieldProps) => {
    return ( 
        <FormGroup className="mb-3" controlId={name + `-input`}>
            <FormLabel>{label}</FormLabel>
            <FormControl
            {...props}
            {...register(name, registerOptions)}
            isInvalid={!!error}
            />
            <FormControl.Feedback type="invalid">
                {error?.message}
            </FormControl.Feedback>
        </FormGroup>
    );
}

export default TextInputField;