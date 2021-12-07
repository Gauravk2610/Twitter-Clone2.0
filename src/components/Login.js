import { Twitter } from "@mui/icons-material"
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged, FacebookAuthProvider } from '@firebase/auth'
import { auth, db } from "../firebase"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { userState } from "../atoms/userAtom"
import { doc, serverTimestamp, setDoc } from "@firebase/firestore"

function Login() {

    const [user, setUser] = useRecoilState(userState)

    // useEffect(() => onAuthStateChanged(auth, (user) => {
    //     console.log(user?.auth.currentUser.displayName)
    //     setUser(user?.auth.currentUser.displayName)
    // }))

    const SignOut = () => {
        signOut(auth)
        setUser(null)
    }

    const signIn = () => {
        console.log(auth.currentUser)
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setDoc(doc( db,'users', user.uid), {
                    id: user.uid,
                    displayName: user.displayName,
                    userName: user.displayName.split(' ').join("").toLocaleLowerCase(),
                    email: user.email,
                    photoURL: user.photoURL,
                    timestamp: serverTimestamp()
                }).then(() => {
                    console.log("User Added to Db")
                }).catch((error) => {
                    alert(error.message)
                })
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    const FacebookSignIn = () => {
        console.log(auth.currentUser)
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return (
        <div className='h-screen text-white flex w-full justify-start sm:justify-center lg:justify-start '>
            <div className='w-6/12 xl:w-7/12 hidden lg:inline-flex'>
                <img className='w-full h-screen object-cover' src="https://preview.redd.it/0qgzczevq5a71.png?width=640&height=466&crop=smart&auto=webp&s=2c71c5458d5b1ccf9260c7ff4c5ff9cd553a5c4c" alt="" />
            </div>
            <div className='text-white mx-8 py-8 h-screen flex flex-col pt-16'>
                <Twitter className='login__twitter_logo' />
                <h1 className='text-5xl md:text-6xl font-bold py-12 text-gray-300'>Happening now</h1>
                <h3 className='text-3xl text-gray-300 font-bold'>Join Twitter today</h3>
                <button onClick={signIn} className='w-3/4 mt-8 text-black bg-white rounded-full py-2 text-lg font-bold flex items-center justify-center space-x-4'><span>Sign in with</span><img className='w-6' src="https://cdn.icon-icons.com/icons2/836/PNG/512/Google_icon-icons.com_66793.png" alt="" /></button>
                <button onClick={FacebookSignIn} className='w-3/4 mt-2 text-black bg-white rounded-full py-2 text-lg font-bold flex items-center justify-center space-x-4'><span>Login with</span><img className='w-6' src="https://cdn.icon-icons.com/icons2/1826/PNG/512/4202107facebookfblogosocialsocialmedia-115710_115591.png" alt="" /></button>
                {/* <button onClick={SignOut}>SignOut</button> */}
            </div>
        </div>
    )
}

export default Login
