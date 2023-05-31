import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";


export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null)
    const googleProvider = new GoogleAuthProvider();

    // user create 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign IN 
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword ( auth , email, password)
    }

    const googleSignIn = () => {
        setLoading (true);
        return signInWithPopup(auth, googleProvider)
    }

    // logout 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // updateProfile 
    const UserUpdateProfile = (name, photo) => {
       return updateProfile (auth.currentUser, {
            displayName : name , photoURL: photo
        })
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log(currentUser);
            setLoading(false)
        });

        return () => {
            return unsubscribe();
        }

    }, [])


    const AuthInfo = {
        user, loading , createUser, signIn, logOut,UserUpdateProfile,googleSignIn
    }
    return (
        <AuthContext.Provider value={AuthInfo}  >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;