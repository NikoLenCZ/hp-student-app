import './App.css';
import StudentList from './Components/StudentList';
import StudentDetail from './Components/StudentDetail';
import StudentCreateForm from './Components/StudentCreateForm';
import StudentEditForm from './Components/StudentEditForm';
import { createHashRouter, RouterProvider } from "react-router-dom";
import Footer from './Components/Footer';

function App() {

  const router = createHashRouter([
    {
      path: "/",
      element: <StudentList />,
    },
    {
      path: "/students/:id",
      element: <StudentDetail />,
    },
    {
      path: "/students/:id/edit",
      element: <StudentEditForm />,
    },
    {
      path: "/students/create",
      element: <StudentCreateForm />,
    },
  ]);



  return (
    <>
      <RouterProvider router={ router } />
      <Footer />
    </>
  );
}

export default App;
