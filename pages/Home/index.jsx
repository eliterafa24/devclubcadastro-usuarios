import { useState } from 'react'
import './style.css'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  async function getUsers() {
    const usersFromApi = await api.get('usuarios')
  }

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddUser = () => {
    if (formData.name && formData.age && formData.email) {
      const newUser = {
        id: crypto.randomUUID(),
        name: formData.name,
        age: formData.age,
        email: formData.email
      }
      setUsers([...users, newUser])
      setFormData({ name: '', age: '', email: '' }) // limpa campos
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id)
    setUsers(updatedUsers)
  }

  return (
    <div className='Container'>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Cadastro Cliente</h1>
        <input
          name='name'
          type='text'
          placeholder='Nome'
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          name='age'
          type='number'
          placeholder='Idade'
          value={formData.age}
          onChange={handleInputChange}
        />
        <input
          name='email'
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
        />
        <button type='button' onClick={handleAddUser}>Cadastrar</button>
      </form>

      <div className='UserList'>
        {users.map(user => (
          <div key={user.id} className='UserCard'>
            <div>
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Idade:</strong> {user.age}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button onClick={() => handleDelete(user.id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
