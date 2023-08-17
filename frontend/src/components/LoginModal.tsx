import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";
import { Form, Modal, ModalHeader, ModalBody, Button, ModalTitle, Alert, } from "react-bootstrap";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

type LoginModalProps = {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}



const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();
    const [errorText, setErrorText] = useState<string | null>(null);

    const onSubmit = async (credentials: LoginCredentials) => {
        try {
            const user = await NotesApi.login(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message)
            } else {
                alert(error);

            }
            console.error(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <ModalHeader closeButton>
                <ModalTitle>
                    Login
                </ModalTitle>
            </ModalHeader>

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
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button type="submit" disabled={isSubmitting} className={styleUtils.width100}>
                        Login
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export

    default LoginModal;