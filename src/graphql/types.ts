export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  fetchComments: Array<Comment>;
  notifications: Array<Notification>;
  nearby: Array<Post>;
  latest: Array<Post>;
  popular: Array<Post>;
  fetchPost: Post;
  threads: Array<Thread>;
  thread: Thread;
  findThread: Thread;
  messages: Array<Message>;
  profile: Profile;
  posts: Array<Post>;
};


export type QueryFetchCommentsArgs = {
  postId: Scalars['String'];
};


export type QueryNearbyArgs = {
  before?: Maybe<Scalars['String']>;
  distance: Scalars['Int'];
  coordinates: Array<Scalars['Float']>;
};


export type QueryLatestArgs = {
  before?: Maybe<Scalars['String']>;
};


export type QueryFetchPostArgs = {
  id: Scalars['String'];
};


export type QueryThreadArgs = {
  id: Scalars['String'];
};


export type QueryFindThreadArgs = {
  postId: Scalars['String'];
};


export type QueryMessagesArgs = {
  threadId: Scalars['String'];
};


export type QueryPostsArgs = {
  before?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  body: Scalars['String'];
  post: Post;
  user: User;
  createdAt: Scalars['DateTime'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  body: Scalars['String'];
  location: Location;
  likes: Scalars['Int'];
  views: Scalars['Int'];
  comments: Scalars['Int'];
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  liked: Scalars['Boolean'];
};

export type Location = {
  __typename?: 'Location';
  city: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  country: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  rating: Scalars['Float'];
};


export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  action: Scalars['String'];
  actor: Scalars['String'];
  targetType: Scalars['String'];
  targetId: Scalars['String'];
  unread: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Thread = {
  __typename?: 'Thread';
  id: Scalars['ID'];
  last: Message;
  post: Post;
  sender: User;
  receiver: User;
  ended: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  body: Scalars['String'];
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID'];
  notifications: Scalars['Int'];
  rating: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  markNotificationAsRead: Scalars['Boolean'];
  createPost: Post;
  flagPost: Scalars['Boolean'];
  likePost: Post;
  createThread: Thread;
  endThread: Scalars['Boolean'];
  sendMessage: Message;
  signUp: AuthResult;
};


export type MutationCreateCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['String'];
};


export type MutationCreatePostArgs = {
  coordinates: Array<Scalars['Float']>;
  body: Scalars['String'];
};


export type MutationFlagPostArgs = {
  reason: Scalars['String'];
  id: Scalars['String'];
};


export type MutationLikePostArgs = {
  id: Scalars['String'];
};


export type MutationCreateThreadArgs = {
  postId: Scalars['String'];
  body: Scalars['String'];
};


export type MutationEndThreadArgs = {
  id: Scalars['String'];
};


export type MutationSendMessageArgs = {
  threadId: Scalars['String'];
  body: Scalars['String'];
};


export type MutationSignUpArgs = {
  deviceId: Scalars['String'];
  pushToken?: Maybe<Scalars['String']>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String'];
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};


export type SubscriptionNewMessageArgs = {
  threadId: Scalars['String'];
};
