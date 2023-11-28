import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = () => {
    setLoading(true);
    return fetch("https://hp-characters-api.onrender.com/characters")
      .then((response) => response.json())
      .then((data) => {
        const filteredStudents = filterStudents(data);
        setStudents(filteredStudents);
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const filterStudents = (students) => {
    return students.filter((student) => student.hogwartsStudent === true && student.house.trim().length > 0);
  };

  const deleteStudent = (id) => {
    return fetch(`https://hp-characters-api.onrender.com/characters/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDeleteButton = (id) => {
    deleteStudent(id).then(() => {
      fetchStudents();
    });
  };

  return (
    <>
      <div className="content-wrapper">
        <h1>List of students</h1>
        { loading ? <p class="text-loading">Loading data&nbsp;<span></span><span></span><span></span></p> : null }
        { error ? <p className='text-error'>{ error }</p> : null }
        { students.length > 0 ? (
          <table className="student-list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>House</th>
                <th>Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { students.map((student) => (
                <tr key={ student.id }>
                  <td>
                    <Link to={ `/students/${student.id}` }>
                      { student.name }
                    </Link>
                  </td>
                  <td>{ student.gender }</td>
                  <td>{ student.house }</td>
                  <td>{ student.year }</td>
                  <td>
                    <Link className="px-3 py-2 text-white hover:text-white no-underline bg-indigo-600 border border-indigo-600 rounded-md btn-edit hover:border-indigo-700 hover:bg-indigo-700 mr-2 inline-block min-h-[42px]" to={ `/students/${student.id}/edit` }>Edit</Link>{ " " }
                    <button
                      type="button"
                      onClick={ () => handleDeleteButton(student.id) }
                      className="student-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        ) : null }
        <nav className="nav-create">
          <Link className="btn-create" to="/students/create">Create new student</Link>
        </nav>
      </div>
    </>
  );
};

export default StudentList;