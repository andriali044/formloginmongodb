import React, {useState, Fragment} from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');
    const[redirect,setRedirect] = useState(false);
    const[error,setError] = useState('');
    
    const onChangeUsername = (e) => {
        const value = e.target.value
        setUsername(value)
        setError('')
    }
    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
        setError('')
    }

    const submitLogin = () => {
        const data = {
            username: username,
            password: password
        }
        axios.post('http://localhost:3001/login', data)
        .then(result => {
            if(result) {
                localStorage.setItem('token', result.data.token)
                setRedirect(true)
            }
        })
        .catch(e => {
            setError(e.response.data.message)
        })
    }

  return (
    <Fragment>
        {
            redirect && (
                <Redirect to="/dashboard" />
            )
        }
    <div style={{marginTop: "250px"}}>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card p-4'>
                        {
                            error && (
                                <div className='alert alert-danger'>
                                    <p>{error}</p>
                                </div>
                            )
                        }
                        <div className='card-body'>
                            <div className='form-group'>
                                <label>Username</label>
                                <input type="text" placeholder='username' className='form-control' value={username} onChange={onChangeUsername}/>
                            </div>

                            <div className='form-group'>
                                <label>Password</label>
                                <input type="password" placeholder='Password' className='form-control' value={password} onChange={onChangePassword}/>
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                <button className='btn btn-primary' onClick={submitLogin}>Login</button>
                            </div>

                            <div className='col-md-6 text-right'>
                                <Link to='/daftar' className=''>
                                    Halaman Daftar
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Fragment>
  )
}

export default Login