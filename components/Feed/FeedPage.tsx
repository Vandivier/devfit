import React, { useEffect, useState, Fragment } from 'react';

import { Container, Loader, Item } from 'semantic-ui-react';
import { Post } from '@prisma/client';

type FeedPageProps = {};

export const FeedPage: React.FC<FeedPageProps> = () => {
  const [postItemsData, setPostItemsData] = useState<Post[] | undefined>(
    undefined
  );

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Feed Page</h1>

      {!postItemsData && (
        <div>
          <Loader active inline="centered" />
        </div>
      )}

      {postItemsData && (
        <Container>
          {postItemsData.map((post: Post) => (
            <Fragment key={`post${post.id}`}>
              <PostItem post={post} />
            </Fragment>
          ))}
        </Container>
      )}
    </div>
  );
};

type PostItemProps = {
  post: Post;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {

  return (
      <Item>
          Post
      </Item>
  );
};
