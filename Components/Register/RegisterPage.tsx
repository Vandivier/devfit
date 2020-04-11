import React, { useState } from 'react';
import { Button, Form, Container, Message } from 'semantic-ui-react';

type UserInput = {
    username: string;
    password: string;
}

type RegisterPageProps = {}

export const RegisterPage: React.FC<RegisterPageProps> = () => {
    const [errorMessage, setErrorMessage] = useState<ErrorMessage | undefined>(undefined);
    const [userInput, setUserInput] = useState<UserInput>({username: '', password: ''})
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const loginPageStyles = {
        parentDiv: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column' as 'column'
        }
    }

    const handleLoginSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setButtonLoading(true);
        setErrorMessage(undefined);

        if (userInput.username === '') {
            setErrorMessage({
                header: 'Error!',
                content: 'Please enter a username.',
                warning: true
            });
            return setButtonLoading(false);
        }

        if (userInput.password === '') {
            setErrorMessage({
                header: 'Error!',
                content: 'Please enter a password.',
                warning: true
            });
            return setButtonLoading(false);
        }

        return setTimeout(() => {
            setButtonLoading(false);
            setErrorMessage({
                header: 'Complete!',
                content: 'This is a mock response.',
                info: true
            });
        }, 1000);
    }

    return (
        <div css={loginPageStyles.parentDiv}>
            <h1 style={{textAlign: 'center'}}>Create an account</h1>

            <Container>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input 
                        placeholder='Username' 
                        onChange={(e) => setUserInput({...userInput, username: e.target.value})}
                        disabled={buttonLoading}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Password</label>
                        <input 
                        placeholder='Password' 
                        type='password' 
                        onChange={(e) => setUserInput({...userInput, password: e.target.value})}
                        disabled={buttonLoading}
                        />
                    </Form.Field>

                    <Button 
                    type='submit' 
                    fluid
                    onClick={handleLoginSubmit}
                    loading={buttonLoading}
                    disabled={buttonLoading}
                    >
                        Submit
                    </Button>
                </Form>

                <Message hidden={!errorMessage}
                header={errorMessage?.header}
                content={errorMessage?.content}
                info={errorMessage?.info || false}
                positive={errorMessage?.positive || false}
                warning={errorMessage?.warning || false}
                negative={errorMessage?.negative || false}
                />
            </Container>
        </div>
    );
}