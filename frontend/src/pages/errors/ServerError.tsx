import ErrorComponent from './ErrorComponent'

export default function ServerError() {
    return (
        <ErrorComponent
            code="500"
            content="There is an error with the server, try again later."
        />
    )
}
