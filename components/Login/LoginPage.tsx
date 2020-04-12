/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import React, { useState } from 'react';

import { Container, Form, Button, Message } from 'semantic-ui-react';
import { poster } from '../../lib/request';
import { useRouter } from 'next/router';

type UserInput = {
  username: string;
  password: string;
};

type LoginPageProps = {};

export const LoginPage: React.FC<LoginPageProps> = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | undefined>(
    undefined
  );
  const [userInput, setUserInput] = useState<UserInput>({
    username: '',
    password: '',
  });
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const loginPageStyles = {
    parentDiv: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column' as 'column',
    },
  };

  const handleLoginSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setButtonLoading(true);
    setErrorMessage(undefined);

    if (userInput.username === '') {
      setErrorMessage({
        header: 'Error!',
        content: 'Please enter a username.',
        warning: true,
      });
      return setButtonLoading(false);
    }

    if (userInput.password === '') {
      setErrorMessage({
        header: 'Error!',
        content: 'Please enter a password.',
        warning: true,
      });
      return setButtonLoading(false);
    }

    return poster('/login', userInput).then((x) => {
      if (x.status === 200) {
        router.push('/feed');
      } else {
        setButtonLoading(false);
        setErrorMessage({
          header: 'Error!',
          content: 'something went wrong :(',
          warning: true,
        });
      }
    });
  };

  return (
    <div css={loginPageStyles.parentDiv}>
      <h1 style={{ textAlign: 'center' }}>Login to your account</h1>

      <Container>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input
              placeholder="Username"
              onChange={(e) =>
                setUserInput({ ...userInput, username: e.target.value })
              }
              disabled={buttonLoading}
            />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
              disabled={buttonLoading}
            />
          </Form.Field>

          <Button
            type="submit"
            fluid
            onClick={handleLoginSubmit}
            loading={buttonLoading}
            disabled={buttonLoading}
          >
            Submit
          </Button>
        </Form>

        <Message
          hidden={!errorMessage}
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
};
