import './utils.css';
export const RegisterDone = () => {
    return(
        <div>
            <div className="registerDone">
                <p>Your account as been created!</p>
            </div>
        </div>
    )
}

export const RegisterError = () => {
    return(
        <div>
            <div className="registerError">
                <p>Please check the info that you are writed!</p>
            </div>
        </div>
    )
}

export const EnterError = () => {
    return(
        <div>
            <div className="enterError">
                <p>The credentials are wrong!</p>
            </div>
        </div>
    )
}