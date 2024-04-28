import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE } from '../../config'
import type { RegisterFormBody } from './types'

export default function Register() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!username || !email || !password) {
            return toast.error('All fields are required!')
        }

        const body: RegisterFormBody = { username, email, password }

        try {
            const url = '/api/users/register'
            const response = await fetch(API_BASE + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                return toast.error(`Register failed with: ${response.status}`)
            }
            const data: RegisterFormBody = await response.json()
            if (!data) navigate('/500')
            toast.success('Registered successfully')
            navigate('/login')
        } catch (error) {
            if (error instanceof Error)
                return toast.error(`Error while registering: ${error.message}`)
            toast.error('Error while registering')
            console.log('register error:', error)
        }
    }

    return (
        <div>
            <form
                className="border border-secondary/20 rounded-md flex flex-col gap-4 px-6 py-8 mt-20 max-w-xl mx-auto"
                onSubmit={handleRegister}
            >
                <h1 className="text-2xl text-center mb-2">Sign Up Form</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="input input-bordered"
                        required
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered"
                        required
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered"
                        required
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-control mt-8">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
                <p className="text-center mt-8 font-normal text-base-content">
                    Already have an account?{' '}
                    <Link to={'/login'} className="underline text-primary">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}
