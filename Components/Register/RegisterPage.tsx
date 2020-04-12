import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Container,
  Message,
  Dropdown,
  Loader,
} from 'semantic-ui-react';
import { poster } from '../../lib/poster';
import { useRouter } from 'next/router';

import { tagsList, Tag } from '../MockData';

type UserInput = {
  username: string;
  password: string;
  tags: number[];
};

type RegisterPageProps = {};

export const RegisterPage: React.FC<RegisterPageProps> = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | undefined>(
    undefined
  );
  const [userInput, setUserInput] = useState<UserInput>({
    username: '',
    password: '',
    tags: [],
  });
  const [tagOptions, setTagOptions] = useState<
    { key: number; text: string; value: number }[] | undefined
  >(undefined);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setTagOptions(
        tagsList.map((tag) => {
          return {
            key: tag.id,
            text: tag.name,
            value: tag.id,
          };
        })
      );
    }, 1000);
  }, []);

  const loginPageStyles = {
    parentDiv: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column' as 'column',
    },
  };

  const handleTagSelection = (e: React.SyntheticEvent, { value }) => {
    setUserInput({
      ...userInput,
      tags: [value],
    });
  };

  const handleLoginSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setButtonLoading(true);
    setErrorMessage(undefined);

    console.log(userInput);

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

    return poster('/register', {
      ...userInput,
      tagIds: [],
      newTags: [],
    }).then((x) => {
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
      <h1 style={{ textAlign: 'center' }}>Create an account</h1>

      {!tagOptions ? (
        <Loader active inline="centered" />
      ) : (
        <Container>
          <Form>
            <Form.Field required>
              <label>Username</label>
              <input
                placeholder="Username"
                onChange={(e) =>
                  setUserInput({ ...userInput, username: e.target.value })
                }
                disabled={buttonLoading}
              />
            </Form.Field>

            <Form.Field required>
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

            <Form.Field>
              <label>Tags</label>

              <Dropdown
                placeholder="Select tags"
                fluid
                multiple
                selection
                options={tagOptions}
                onChange={handleTagSelection}
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
      )}
    </div>
  );
};
