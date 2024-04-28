import { Link, NavLink, Outlet } from 'react-router-dom'
import UserCircleIcon from '../icons/UserCircleIcon'
import { Toaster } from 'react-hot-toast'

function Navbar({ isLoggedIn }: { isLoggedIn: Boolean }) {
    return (
        <div className="navbar px-0 border-b border-secondary/50 mb-10">
            <div className="flex-1">
                <Link to={'/'} className="btn btn-ghost text-xl font-bold">
                    Amine's Blog
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 space-x-3">
                    <li>
                        <NavLink to={'/'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/create'}>Create</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/about'}>About</NavLink>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <Link to={'/profile'}>
                                <UserCircleIcon />
                            </Link>
                        ) : (
                            <Link
                                to={'/login'}
                                className="bg-primary text-primary-content hover:text-primary hover:bg-primary-content ml-3"
                            >
                                Login
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default function Root() {
    // TODO check for login and add context if user logged in
    const isLoggedIn = false
    return (
        <div className="min-h-screen container font-inter font-semibold">
            <Toaster />
            <Navbar isLoggedIn={isLoggedIn} />
            <Outlet />
        </div>
    )
}
