import React, { useState } from 'react';
import { CloudinaryUpload } from '../../real-components/CloudinaryUpload';
import { format } from 'date-fns';

import { Button, Header, Image, Modal, Form, Dropdown, Message, Feed, Segment } from 'semantic-ui-react';
import { poster } from '../../lib/request';
import { PostWithStuff } from '../../utils/PostWithStuff';
<<<<<<< HEAD
import { useGetter } from '../../real-components/useGetter';
=======
import { useRouter } from 'next/router';
>>>>>>> 6c718ca9189319b9f7814a9e27a8ee585e120960

type FeedPageProps = {
    data: PostWithStuff[];
};

export const FeedPage: React.FC<FeedPageProps> = ({ data }) => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Global Feed</h1>
            <NewChallenge />
            <Segment>{data.length < 1 ? <p style={{ textAlign: 'center' }}>No feed items to show.</p> : <PostsFeed data={data} />}</Segment>
        </div>
    );
};

type PostsFeedProps = {
    data: PostWithStuff[];
};

const PostsFeed: React.FC<PostsFeedProps> = ({ data }) => {

    const router = useRouter();

    return (
        <Feed>
            {data.map((post) => (
                <Feed.Event key={'' + post.id}>
                    <Feed.Content>
                        <Feed.Summary>
                            {post.user.username} completed: {post.challenge.name}
                            <Feed.Date>{format(new Date(post.createdAt), 'MMMM dd yyyy')}</Feed.Date>
                            {post.videoUrl && <Image src={post.videoUrl} size="small" />}
                        </Feed.Summary>

                        {post.caption && <Feed.Extra text>{post.caption}</Feed.Extra>}

                        <Feed.Meta>
                            <Feed.User onClick={() => router.push(`/profile/${post.user.username}`)}>Visit Profile</Feed.User>
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
    proof?: { type: string; link: string };
};

// const exerciseList = [
//     { id: 111, exercise: '15 Pushups' },
//     { id: 222, exercise: '10 Minute jog' },
//     { id: 333, exercise: '20 Situps' },
//     { id: 444, exercise: '100 Squats' },
// ];

type NewChallengeProps = {};

const NewChallenge: React.FC<NewChallengeProps> = () => {
    const { data } = useGetter('/challenges');
    const exerciseList = data ? data.map((x) => ({ ...x, exercise: x.name })) : [];
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<UserInput>({
        exercise: undefined,
        reps: undefined,
        caption: undefined,
        proof: {
            type: undefined,
            link: undefined,
        },
    });
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<ErrorMessage | undefined>(undefined);

    const exerciseMap = {};

    for (const exercise of exerciseList) {
        exerciseMap[exercise.id] = exercise.exercise;
    }

    const exerciseOptions = exerciseList.map((exercise, index: number) => ({ key: index, text: exercise.exercise, value: exercise.id }));

    const handleExerciseSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setButtonLoading(true);

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

        const newChallengeSubmission = {
            caption: userInput.caption,
            videoUrl: userInput.proof.link,
            createdAt: new Date(),
            challenge: {
                create: {
                    basePointValue: userInput.exercise,
                    maxPoints: userInput.exercise * 10,
                    name: exerciseMap[userInput.exercise],
                },
            },
        };

        poster('/post/create', { ...newChallengeSubmission }).then((x) => {
            if (x.status === 200) {
                setButtonLoading(false);
                setModalOpen(false);
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
                            <CloudinaryUpload
                                onUpload={(image) => setUserInput({ ...userInput, proof: { type: image.resource_type, link: image.url } })}
                            />
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

            <Button primary fluid onClick={() => setModalOpen(!modalOpen)}>
                Complete a challenge
            </Button>
        </div>
    );
};
