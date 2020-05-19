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
  nearby: Array<Post>;
  latest: Array<Post>;
  popular: Array<Post>;
  fetchPost: Post;
  profile: User;
};


export type QueryNearbyArgs = {
  before?: Maybe<Scalars['String']>;
  coordinates: Array<Scalars['Float']>;
};


export type QueryLatestArgs = {
  before?: Maybe<Scalars['String']>;
};


export type QueryFetchPostArgs = {
  id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  body: Scalars['String'];
  location: Location;
  likes: Scalars['Int'];
  comments: Array<Comment>;
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  liked: Scalars['Boolean'];
};

export type Location = {
  __typename?: 'Location';
  city: Scalars['String'];
  state: Scalars['String'];
  country: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  body: Scalars['String'];
  post: Post;
  user: User;
  createdAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  likePost: Post;
  createComment: Comment;
  signUp: AuthResult;
};


export type MutationCreatePostArgs = {
  coordinates: Array<Scalars['Float']>;
  body: Scalars['String'];
};


export type MutationLikePostArgs = {
  id: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['String'];
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String'];
  user: User;
};
