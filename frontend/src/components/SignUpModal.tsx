import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Modal, ModalBody, ModalHeader, Form, Button, Alert } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";

type SignUpModalProps = {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();
    const [errorText, setErrorText] = useState<string | null>(null);

    const onSubmit = async (credentials: SignUpCredentials) => {
        try {
            const newUSer = await NotesApi.signUp(credentials)
            onSignUpSuccessful(newUSer)
        } catch (error) {
            if (error instanceof ConflictError){
                setErrorText(error.message)
            }else{
                alert(error);
            }
            console.log(error);
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <ModalHeader closeButton>Sign Up</ModalHeader>
            <ModalBody>
            {errorText && 
                <Alert variant="danger">
                    {errorText}
                </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />

                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email Address"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    />

                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button type="submit" disabled={isSubmitting} className={styleUtils.width100}>
                        Sign Up
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default SignUpModal;