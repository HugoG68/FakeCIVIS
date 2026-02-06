import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import Bug1 from '../pages/Bug1/Bug1'
import Bug2 from '../pages/Bug2/Bug2'

const router = createBrowserRouter([
  { path: '/bug1', element: <Bug1 /> },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/bug2', element: <Bug2 /> }
    ],
  },
])

export { router }
