import React, { useState } from 'react';
import { CloudinaryUpload } from '../../real-components/CloudinaryUpload';
import { Post } from '@prisma/client';

import { Button, Header, Image, Modal, Form, Dropdown, Message, Feed } from 'semantic-ui-react';

type FeedPageProps = {
    data: Post[];
};

export const FeedPage: React.FC<FeedPageProps> = ({ data }) => {
    return (
        <div>
            <h1>Feed Page</h1>
            <NewChallenge />

            <PostsFeed data={data} />
        </div>
    );
};

type PostsFeedProps = {
    data: Post[];
};

const PostsFeed: React.FC<PostsFeedProps> = ({ data }) => {
    return (
        <Feed>
            {data.map((post: Post) => (
                <Feed.Event key={post.id}>
                    <Feed.Content>
                        <Feed.Summary>
                            Challenge completed: {post.challengeId}
                            <Feed.Date>{post.createdAt}</Feed.Date>
                        </Feed.Summary>

                        {post.videoUrl && (
                            <Feed.Extra text>
                                {post.videoUrl}
                                {post.caption}
                            </Feed.Extra>
                        )}

                        <Feed.Meta>
                            {/* TODO: Replace with actual number of likes */}
                            14 likes
                        </Feed.Meta>
                    </Feed.Content>
                </Feed.Event>
            ))}
        </Feed>
    );
};

type UserInput = {
    exercise: number | undefined;
    reps: number | undefined;
    caption?: string;
    proof?: string;
};

const exerciseList = [
    { id: 111, exercise: '15 Pushups' },
    { id: 222, exercise: '10 Minute jog' },
    { id: 333, exercise: '20 Situps' },
    { id: 444, exercise: '100 Squats' },
];

type NewChallengeProps = {};

const NewChallenge: React.FC<NewChallengeProps> = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<UserInput>({
        exercise: undefined,
        reps: undefined,
        caption: undefined,
        proof: undefined,
    });
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrorMessage | undefined>(undefined);

    const exerciseOptions = exerciseList.map((exercise, index: number) => ({ key: index, text: exercise.exercise, value: exercise.id }));

    const handleExerciseSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setButtonLoading(true);
        console.log(userInput);

        if (!userInput.exercise) {
            setErrorMessage({
                header: 'Error!',
                content: 'Please select your exercise.',
                warning: true,
            });
            return setButtonLoading(false);
        }

        if (!userInput.reps) {
            setErrorMessage({
                header: 'Error!',
                content: 'Please enter your reps.',
                warning: true,
            });
            return setButtonLoading(false);
        }

        setTimeout(() => {
            setErrorMessage({
                header: 'Great!',
                content: 'Mock response here.',
                info: true,
            });
            return setButtonLoading(false);
        }, 1000);
    };

    return (
        <div>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="small" closeIcon centered={false}>
                <Modal.Content>
                    <Form>
                        <Form.Field required>
                            <label>Select an exercise</label>
                            {/* TODO: Load actual exercises */}
                            <Dropdown
                                placeholder="Select an exercise"
                                fluid
                                selection
                                options={exerciseOptions}
                                onChange={(e, { value }) => setUserInput({ ...userInput, exercise: parseInt(value.toString()) })}
                                disabled={buttonLoading}
                            />
                        </Form.Field>

                        <Form.Field required>
                            <label>Reps</label>
                            <input
                                disabled={buttonLoading}
                                type="number"
                                onChange={(e) => setUserInput({ ...userInput, reps: parseInt(e.target.value) })}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Caption</label>
                            <input
                                disabled={buttonLoading}
                                type="text"
                                onChange={(e) => setUserInput({ ...userInput, caption: e.target.value })}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Video/Image validation</label>
                            {/* TODO: Fix this */}
                            {/* <CloudinaryUpload /> */}
                        </Form.Field>

                        <Button type="submit" fluid onClick={handleExerciseSubmit} loading={buttonLoading} disabled={buttonLoading}>
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
                </Modal.Content>
            </Modal>

            <Button fluid size="big" color="pink" onClick={() => setModalOpen(!modalOpen)}>
                Complete a challenge
            </Button>
        </div>
    );
};
