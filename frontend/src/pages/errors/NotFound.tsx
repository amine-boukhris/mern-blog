import ErrorComponent from './ErrorComponent'
export default function NotFound() {
    return (
        <ErrorComponent
            code="404"
            content="The page you are looking wasn't found!"
        />
    )
}
