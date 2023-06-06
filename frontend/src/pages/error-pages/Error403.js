import { Card } from "react-bootstrap";

const Error403 = () => {
    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "500px", minWidth: "600px" }}
            >
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <p className="text-danger h1">403! FORBIDDEN</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};
export default Error403;