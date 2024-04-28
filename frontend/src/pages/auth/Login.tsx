import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import type { LoginFormBody } from './types'
import { API_BASE } from '../../config'

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !password) {
            return toast.error('All fields are required!')
        }

        const body: LoginFormBody = { email, password }

        try {
            const url = '/api/users/login'
            const response = await fetch(API_BASE + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
            if (!response.ok) {
                return toast.error(`Login failed with: ${response.status}`)
            }
            const data: {token: string} = await response.json()
            if (!data.token) return navigate('/500')

            localStorage.setItem('token', data.token)
            toast.success('Logged in successfully')
            navigate('/')

        } catch (error) {
            if (error instanceof Error)
                return toast.error(`Error while logging in: ${error.message}`)
            toast.error('Error while logging in')
            console.log('login error:', error)
        }
    }

    return (
        <div>
            <form
                className="border border-secondary/20 rounded-md flex flex-col gap-4 px-6 py-8 mt-20 max-w-xl mx-auto"
                onSubmit={handleLogin}
            >
                <h1 className="text-2xl text-center mb-2">Login Form</h1>
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
                    <button className="btn btn-primary">Login</button>
                </div>
                <p className="text-center mt-8 font-normal text-base-content">
                    Don't have an account yet?{' '}
                    <Link to={'/register'} className="underline text-primary">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    )
}
