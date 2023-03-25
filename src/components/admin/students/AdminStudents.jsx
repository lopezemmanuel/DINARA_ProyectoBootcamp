import React, { useEffect, useState } from 'react'
import StudentList from './StudentList'
import '../../../styles/admin/AdminStudents.css'

const AdminStudents = ({ userData }) => {
    // Estado para guardar los usuarios recibidos o mensaje de error
    const [students, setStudents] = useState([])
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    // Llamado a la API para conseguir los usuarios registrados
    useEffect(() => {
        const getUsers = async () => {
            const apiURL = `http://127.0.0.1:4001/api/v1/user/getUsers`
            const response = await fetch(apiURL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                },
            })
            const data = await response.json();

            // Manejo de peticiones sin autorización
            if (data?.status !== 401) {
                const { users } = data
                setStudents([...users])
            } else {
                setError(true)
                setMessage(data?.message)
            }
        }

        getUsers()
    }, [])

    // Funcionalidad de búsqueda de estudiantes
    const [inputValues, setInputValues] = useState({
        firstName: '',
        secondName: '',
        surname: '',
        secondSurName: '',
        documentNumber: '',
        email: '',
        phone: ''
    })
    const [displaySearch, setDisplaySearch] = useState(false)

    // Manejo de eventos para la búsqueda
    let filteredStudents = students

    for (const key in inputValues) {
        if (inputValues[key].length > 0) {
            filteredStudents = filteredStudents.filter((student) =>
                student[key].toLowerCase().includes(inputValues[key].toLowerCase())
            );
        }
    }

    const onClearInputs = () => {
        setInputValues({
            firstName: '',
            secondName: '',
            surname: '',
            secondSurName: '',
            documentNumber: '',
            email: '',
            phone: ''
        })
    }

    // Ventana modal para la creación de un nuevo estudiante
    const onCreateStudent = () => {

    }

    return (
        <div className='admin-content-students'>
            <h2 className="admin-content__title">Administrar estudiantes</h2>

            {
                // TODO: Paginador (cada 10 elementos)
            }
            {!error &&
                <>
                    {/* Funcionalidad de búsqueda */}
                    <div className="search-bar">
                        <h3
                            onClick={() => setDisplaySearch(!displaySearch)}
                        >
                            Búsqueda de estudiantes
                            {displaySearch
                                ? <i className="fa-solid fa-circle-xmark"></i>
                                : <i className="fa-solid fa-magnifying-glass"></i>
                            }
                        </h3>

                        <div className={`search-inputs ${displaySearch ? '' : 'hidden'}`}>

                            <div className="search-group">
                                <label htmlFor="nombre1">Primer nombre</label>
                                <input
                                    type="text" name='nombre1'
                                    value={inputValues.firstName}
                                    onChange={(e) => setInputValues({ ...inputValues, firstName: e.target.value })}
                                />
                            </div>

                            <div className="search-group">
                                <label htmlFor="nombre2">Segundo nombre</label>
                                <input
                                    type="text" name='nombre2'
                                    value={inputValues.secondName}
                                    onChange={(e) => setInputValues({ ...inputValues, secondName: e.target.value })}
                                />
                            </div>

                            <div className="search-group">
                                <label htmlFor="apellido1">Primer apellido</label>
                                <input
                                    type="text" name='apellido1'
                                    value={inputValues.surname}
                                    onChange={(e) => setInputValues({ ...inputValues, surname: e.target.value })}
                                />
                            </div>

                            <div className="search-group">
                                <label htmlFor="apellido2">Segundo apellido</label>
                                <input
                                    type="text" name='apellido1'
                                    value={inputValues.secondSurName}
                                    onChange={(e) => setInputValues({ ...inputValues, secondSurName: e.target.value })}
                                />
                            </div>

                            <div className="search-group mobile-hidden">
                                <label htmlFor="nombre">Documento</label>
                                <input
                                    type="number" name='documento'
                                    value={inputValues.documentNumber}
                                    onChange={(e) => setInputValues({ ...inputValues, documentNumber: e.target.value })}
                                />
                            </div>

                            <div className="search-group mobile-hidden">
                                <label htmlFor="nombre">Correo</label>
                                <input
                                    type="text" name='correo'
                                    value={inputValues.email}
                                    onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                                />
                            </div>

                            <div className="search-group mobile-hidden">
                                <label htmlFor="nombre">Teléfono</label>
                                <input
                                    type="number" name='telefono'
                                    value={inputValues.phone}
                                    onChange={(e) => setInputValues({ ...inputValues, phone: e.target.value })}
                                />
                            </div>

                            <button
                                className="clear-inputs"
                                onClick={onClearInputs}
                            >
                                Limpiar campos
                            </button>
                        </div>

                    </div>

                    {(filteredStudents.length > 0) &&
                        <div className="admin-students__list">
                            <StudentList students={filteredStudents} />
                        </div>
                    }

                    {(filteredStudents.length === 0) &&
                        <div className="error-alert">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            No hay estudiantes registrados en la aplicación o los criterios de búsqueda no encontraron resultados
                        </div>
                    }

                    <button
                        className="create-student"
                        onClick={onCreateStudent}
                    >
                        Crear un nuevo estudiante
                    </button>
                </>
            }

            {error &&
                <div className="error-alert">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>Ha ocurrido un error:</span> "{message}", por favor reinicia tu sesión para arreglarlo
                </div>
            }
        </div>
    )
}

export default AdminStudents