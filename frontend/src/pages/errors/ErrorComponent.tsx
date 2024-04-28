import { Link } from 'react-router-dom'

interface ServerErrorProps {
    code: string
    content: string
}

export default function ServerError({ code, content }: ServerErrorProps) {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-8xl font-bold">{code}</h1>
                    <p className="py-6 text-2xl">
                        {content}
                    </p>
                    <Link to={'/'} className="btn btn-primary">
                        Back to homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}
