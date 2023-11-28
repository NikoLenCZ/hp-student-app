import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const StudentEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  const fetchStudent = () => {
    return fetch(`https://hp-characters-api.onrender.com/characters/${id}`)
      .then((response) => response.json())
      .then((body) => setStudent(body))
      .catch(error => {
        console.error('Error fetching student:', error);
      });
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const setName = (name) => {
    setStudent({ ...student, name });
  };
  const setPatronus = (patronus) => {
    setStudent({ ...student, patronus });
  };
  const setGender = (gender) => {
    setStudent({ ...student, gender });
  };
  const setHouse = (house) => {
    setStudent({ ...student, house });
  };
  const setYear = (year) => {
    setStudent({ ...student, year });
  };

  const setImage = (image) => {
    setStudent({ ...student, image });
  };

  const updateStudent = () => {
    return fetch(`https://hp-characters-api.onrender.com/characters/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateStudent().then(() => {
      navigate(`/students/${id}`);
    });
  };

  return (
    <>
      <div className="content-wrapper">
        <h1>Edit student</h1>
        { student ? (
          <form onSubmit={ handleSubmit }>
            <div className="student-content">
              <div>
                <label htmlFor="image" className="form-label">
                  Image url:
                </label>
                <input
                  id="image"
                  name="image"
                  className="form-control imgUrl-input"
                  value={ student.image }
                  onChange={ (event) => setImage(event.target.value) }
                />
                <span>Preview:</span>
                <figure className="student-image">
                  <img src={ student.image } alt={ student.name } />
                </figure>

              </div>
              <table className="table table-light table-bordered">
                <tbody>
                  <tr>
                    <th>
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                    </th>
                    <td>
                      <input
                        id="name"
                        name="name"
                        className="form-control"
                        value={ student.name }
                        onChange={ (event) => setName(event.target.value) }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="patronus" className="form-label">
                        Patronus
                      </label>
                    </th>
                    <td>
                      <input
                        id="patronus"
                        name="patronus"
                        className="form-control"
                        value={ student.patronus }
                        onChange={ (event) => setPatronus(event.target.value) }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>
                      <label className="form-check-label" htmlFor="genderMale">
                        male
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderMale"
                        value="male"
                        checked={ student.gender === "male" }
                        onChange={ (event) => setGender(event.target.value) }
                      />
                      <label className="form-check-label" htmlFor="genderFemale">
                        female
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="genderFemale"
                        value="female"
                        checked={ student.gender === "female" }
                        onChange={ (event) => setGender(event.target.value) }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="house" className="form-label">
                        House
                      </label>
                    </th>
                    <td>
                      <select
                        id="house"
                        name="house"
                        className="form-select"
                        value={ student.house }
                        onChange={ (event) => setHouse(event.target.value) }
                      >
                        <option key="Gryffindor" value="Gryffindor">Gryffindor</option>
                        <option key="Hufflepuff" value="Hufflepuff">Hufflepuff</option>
                        <option key="Ravenclaw" value="Ravenclaw">Ravenclaw</option>
                        <option key="Slytherin" value="Slytherin">Slytherin</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <label htmlFor="year" className="form-label">
                        Year
                      </label>
                    </th>
                    <td>
                      <select
                        id="year"
                        name="year"
                        className="form-select"
                        value={ student.year }
                        onChange={ (event) => setYear(event.target.value) }
                      >
                        <option key="1" value="1">1</option>
                        <option key="2" value="2">2</option>
                        <option key="3" value="3">3</option>
                        <option key="4" value="4">4</option>
                        <option key="5" value="5">5</option>
                        <option key="6" value="6">6</option>
                        <option key="7" value="7">7</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end w-full py-3">
                <button className="btn btn-save">Save</button>
              </div>
            </div>

          </form>
        ) : null }
        <nav>
          <Link to="/">Back to student list</Link>
        </nav>
      </div>
    </>
  );
};

export default StudentEditForm;
