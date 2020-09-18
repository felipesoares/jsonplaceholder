import { lazy } from 'react';

const Posts = lazy(() => import('./pages/posts'));
const PostsDetail = lazy(() => import('./pages/posts/detail'));

const Albums = lazy(() => import('./pages/albums'));
const AlbumsDetail = lazy(() => import('./pages/albums/detail'));

const Todos = lazy(() => import('./pages/todos'));

const NotFound = lazy(() => import('./pages/not-found'));

export const routes = [
  { path: '/', exact: true, name: 'Posts', component: Posts },
  { path: '/posts', exact: true, name: 'Posts', component: Posts },
  {
    path: '/posts/:id',
    exact: true,
    name: 'PostsDetail',
    component: PostsDetail,
  },
  { path: '/albums', exact: true, name: 'Albums', component: Albums },
  {
    path: '/albums/:id',
    exact: true,
    name: 'AlbumsDetail',
    component: AlbumsDetail,
  },
  { path: '/todos', exact: true, name: 'Todos', component: Todos },
  {
    path: '',
    exact: true,
    name: 'NotFound',
    component: NotFound,
  },
];
