import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from '../../services/firebase';
import { RegisterDone, RegisterError, EnterError } from '../utils/utils';
import './forms.css';

const Forms = (props) => {
    
    const [forms, setForm] = useState(true);
    const [goIn, setGoIn] = useState(false);
    const [errorRes, setErrorRes] = useState(false);
    const [errorEnter, setErrorEnter] = useState(false);

    const register = async (e) => {

        e.preventDefault();

        const username = e.target.elements.username.value;
        const alias = e.target.elements.alias.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const repeat = e.target.elements.repeatp.value;


        if (password === repeat && password.length >= 8) {

            const auth = getAuth();

            const infoUser = await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               return userCredential;
            })
            .catch((error) => {
                console.log(error);
            });

            const docRef = doc(firestoreDB, `user/${infoUser.user.uid}`);

            setDoc(docRef, {username: username, alias: alias, email: email, password: password, id: infoUser.user.uid});
            
            setErrorRes(false);

            setGoIn(true);

        }else{

            setErrorRes(true);
            
        }
        
    }

    const enter = (e) => {

        e.preventDefault();
        setErrorEnter(false);
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            props.setUserInfo(userCredential);
            console.log("la concha de tu madre", userCredential)
        })
        .catch((error) => {
            setErrorEnter(true);
            console.log(error);
        });
    }


    const FormReg = () => {
        return(
        <div className='forms'>
        <div className="forms-container">
            <form onSubmit={register}>
                <h2>Register account</h2>
                <button onClick={() => setForm(!forms)}>If you are registered enter here!!</button>
                <div>
                    <div className='form-group'>
                        <input className='form-input' type="text" placeholder=' ' name="username" />
                        <label className='form-label' for="username">username:</label>
                        <span className='form-line'></span>
                    </div>
                    <div className='form-group'>
                        <input className='form-input' type="text" placeholder=' ' name="alias" />
                        <label className='form-label' for="alias">alias:</label>
                        <span className='form-line'></span>
                    </div>
                    <div className='form-group'>
                        <input className='form-input' type="email" placeholder=' ' name="email" />
                        <label className='form-label' for="email">Email:</label>
                        <span className='form-line'></span>
                    </div>
                    <div className='form-group'>
                        <input className='form-input' type="password" placeholder=' ' name="password" />
                        <label className='form-label' for="password">Password:</label>
                        <span className='form-line'></span>
                    </div>
                    <div className='form-group'>
                                <input className='form-input' type="password" placeholder=' ' name="repeatp" />
                                <label className="form-label" for="repeatp">Repeat password:</label>
                                <span className='form-line'></span>
                    </div>
                    {goIn ? <button onClick={() => setForm(!forms)}>Continue</button> : <button type="submit">Register</button>}
                </div>
            </form>
           {goIn ? <RegisterDone/> : null }
           {errorRes ? <RegisterError/> : null} 
        </div>
        </div>

        )
        }


    const FormSign = () => {
        setGoIn(false);
    return(
        <div className='forms'>
        <div className="forms-container">
            <form onSubmit={enter}>
                <h2>Sign In</h2>
                <button onClick={() => setForm(!forms)}>If you not have a account Register!</button>
                <div>
                    <div className='form-group'>
                        <input className='form-input' type="email" placeholder=' ' name="email" />
                        <label className='form-label' for="email">Email:</label>
                        <span className='form-line'></span>
                    </div>
                    <div className='form-group'>
                        <input className='form-input' type="password" placeholder=' ' name="password" />
                        <label className='form-label' for="password">Password:</label>
                        <span className='form-line'></span>
                    </div>
                    <button type="submit">Enter</button>
                </div>
            </form>
            {errorEnter ? <EnterError/> : null}
        </div>
        </div>
    )
    }

    return(
        <div>
            {forms ? <FormSign></FormSign> : <FormReg></FormReg> }
        </div>
    )
}

export default Forms;