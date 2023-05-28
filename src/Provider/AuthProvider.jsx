import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";


export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null)

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

    // logout 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
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
        user, loading , createUser, signIn, logOut
    }
    return (
        <AuthContext.Provider value={AuthInfo}  >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;