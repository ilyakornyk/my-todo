import React from 'react'
import { signInWithGoogle, auth } from 'components/firebase/authen'
const LogIn = () => {
    return (
        <>
            <button
                onClick={() => signInWithGoogle()}
                id="google"
                className="btn google"
                title="Sign in with Google"
            >
                <i class="fab fa-google"></i>
            </button>



        </>
    )
}

export default LogIn
