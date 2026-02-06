import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import Bug1 from '../pages/Bug1/Bug1'
import Bug2 from '../pages/Bug2/Bug2'
import Bug3 from '../pages/Bug3/Bug3'

const router = createBrowserRouter([
  { path: '/bug1', element: <Bug1 /> },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/bug2', element: <Bug2 /> },
      { path: '/bug3', element: <Bug3 /> }
    ],
  },
])

export { router }
