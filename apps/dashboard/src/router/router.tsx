import { createBrowserRouter, Navigate } from 'react-router-dom'

import { RequireAuth } from './RequireAuth'
import { Layout } from '../components/Layout'
import { NotFoundPage } from '../pages/404'
import { ErrorPage } from '../pages/Error'
import { LoginPage } from '../pages/Auth/Login'
import { RegisterPage } from '../pages/Auth/Register'
import { DashboardPage, loader as dashboardLoader } from '../pages/Dashboard'
import { AllPostsPage, loader as postsLoader, action as postsAction } from '../pages/Posts/All'
import { CreatePostPage, action as createPostAction } from '../pages/Posts/Create'
import { DraftsPage, loader as draftLoader } from '../pages/Posts/Drafts'
import { PublishedPostsPage, loader as publishedLoader } from '../pages/Posts/Published'
import { SinglePostPage, loader as postLoader, action as updatePostAction } from '../pages/Posts/SinglePost'
import { UsersPage, loader as usersLoader } from '../pages/Users'
import { SettingsPage } from '../pages/Settings'
import { updateBasicsAction, updateEmailAndUsernameAction, updatePasswordAction } from '../actions/settings'
import { ForgotPasswordPage, action as forgotPasswordAction } from '~/pages/ForgotPassword'

export const router = createBrowserRouter([
  {
    path: '/auth',
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
    action: forgotPasswordAction,
  },
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      { path: '/', element: <Navigate to="/posts/all" replace /> },
      {
        path: '/dashboard',
        element: (
          <RequireAuth onlyAdmin>
            <DashboardPage />
          </RequireAuth>
        ),
        loader: dashboardLoader,
        shouldRevalidate: ({ currentUrl }) => currentUrl.pathname !== '/dashboard',
      },
      {
        path: '/posts',
        children: [
          { path: 'all', element: <AllPostsPage />, loader: postsLoader, action: postsAction, shouldRevalidate: ({ currentUrl }) => currentUrl.pathname !== '/posts/all' },
          { path: 'published', element: <PublishedPostsPage />, loader: publishedLoader, shouldRevalidate: ({ currentUrl }) => currentUrl.pathname !== '/posts/published' },
          { path: 'drafts', element: <DraftsPage />, loader: draftLoader, shouldRevalidate: ({ currentUrl }) => currentUrl.pathname !== '/posts/drafts' },
          { path: 'create', element: <CreatePostPage />, action: createPostAction },
          { path: ':slug', element: <SinglePostPage />, loader: postLoader },
          { path: ':slug/update', action: updatePostAction },
        ],
      },
      {
        path: '/users',
        element: (
          <RequireAuth onlyAdmin>
            <UsersPage />
          </RequireAuth>
        ),
        loader: usersLoader,
        shouldRevalidate: ({ currentUrl }) => currentUrl.pathname !== '/users',
      },
      {
        path: '/settings',
        element: <SettingsPage />,
        children: [
          { path: 'update/basics', action: updateBasicsAction },
          { path: 'update/emailAndUsername', action: updateEmailAndUsernameAction },
          { path: 'update/password', action: updatePasswordAction },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
