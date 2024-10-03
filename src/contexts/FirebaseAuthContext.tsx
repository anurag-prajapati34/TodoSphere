import { createContext, useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { firebaseApp } from "../contexts/FirebaseApp";

const firebaseAuth = getAuth(firebaseApp);

interface FirebaseAuthContextType {
  signupUserWithEmailAndPassword: (email: string, password: string, name:string) => void;
  loginUserWithEmailAndPassword: (email: string, password: string) => void;
  logoutUser: () => void;
  loginedUser: any;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextType | undefined>(
  undefined
);

interface AuthContextProviderType {
  children: React.ReactNode;
}

const FirebaseAuthContextProvider: React.FC<AuthContextProviderType> = ({
  children,
}) => {
  const [loginedUser, setLoginedUser] = useState<any>(undefined);

  //sign-up user with email & password

  const signupUserWithEmailAndPassword = async (email: string, password: string,name:string) => {


 try{
  const userCredential  =await createUserWithEmailAndPassword(firebaseAuth, email, password)
const user=userCredential.user;
await updateProfile(user,{displayName:name})



 }
 catch(error){
  console.log("error during signup")
 }


  };

  //login user with email and password
  const loginUserWithEmailAndPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(firebaseAuth, email, password).then((user) =>
      console.log("Successfully Login..", user)
    ).catch((err)=>alert("Incorrect  Email or Password"))
  };

  //logout user

  const logoutUser = () => {
    signOut(firebaseAuth).then(() => console.log("Logout done"));
  };
  //Check logined user
  useEffect(() => {


    onAuthStateChanged(firebaseAuth, (User) => {
      
      setLoginedUser(User);
    });
  }, []);



  return (
    <FirebaseAuthContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        logoutUser,
        loginedUser,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthContext, FirebaseAuthContextProvider };
