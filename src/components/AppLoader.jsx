export default function AppLoader() {
    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
            <div className="text-center">

                <div
                    className="spinner-border text-primary"
                    style={{
                        width: "3rem",
                        height: "3rem"
                    }}
                ></div>

                <h5 className="text-white mt-3">
                    Loading dashboard...
                </h5>

                <p className="text-secondary">
                    Preparing your admin panel
                </p>

            </div>
        </div>
    );
}