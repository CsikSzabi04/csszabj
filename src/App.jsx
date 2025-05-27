import Portfolio from './Portfolio';
import Help from './Help.jsx';
import Helps from './Helps.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Questions from './Questions.jsx';
import Hiv from './Hiv.jsx';

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />, children: [
        { path: "/java", element: <Help /> },
        { path: "/help", element: <Helps /> },
        { path: "/maybehiv", element: <Hiv /> },
        { path: "/questions", element: <Questions /> },
        { path: "/", element: <Portfolio /> }
      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}