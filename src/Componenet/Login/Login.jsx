import React, { useRef, useState } from 'react';
import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../Firebase/firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
    const [logins, setlogins] = useState(''); // eta error er jonno korsi
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState('false');
    const emailRef = useRef(null)

const handleLogin = e => {
    e.preventDefault();
    console.log('submit done')
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    if(password.length < 6){
        setlogins('Password should be at least 6 characters')
        return
    }
    else if(!/[A-Z]/.test(password)){
        setlogins('your password should at lest 1 character uppercase')
        return
    }

    // error messege
        setlogins('')  /* eta dewar karon holo buler karone jokhon error ta ashe ,,, shothik jinish likhle jate error ta muse jaw */

        setSuccess('')


    // creat user
    const auth = getAuth(app)
    signInWithEmailAndPassword(auth, email, password)
    .then(result =>{
        console.log(result.user)
        if(result.user.emailVerified){
            setSuccess('Loged in successfully')
        }
        else{
            alert('please verifiye your email')
        }
    })
    .catch(error =>{
        console.log(error)
        setlogins(error.message)
    })
}

    const handleForgetpassword = e =>{
        const email = emailRef.current.value;
        if(!email){
            console.log('Please provide an email', emailRef.current.value)
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('plese write a valid email')
            return;
        }
        const auth = getAuth(app)
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('please cheek your email')
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return (
        <div>
            <h1 className='text-4xl mt-20 text-red-500'>Login Your Page</h1>
            <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-6">
                <div className="mb-5">
                    <input 
                        type= 'email'
                        ref={emailRef} 
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Email Adress" 
                        name='email' 
                        required />
                        
                </div>
                <div className="relative mb-5">
                    <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    name="password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Password" 
                    required />
                        <span className='absolute   mt-3 right-2' onClick={ () => setShowPassword(!showPassword)}>
                            {showPassword? <FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>}
                        </span>

                    <label className='label'>
                        <a onClick={handleForgetpassword} href="#" className='label-text-alt link link-hover'>
                            Forget password?
                        </a>
                    </label>

                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input 
                            id="remember" 
                            type="checkbox" 
                            value="" 
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                            required />
                    </div>
                    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            {
                logins && <p className='mt-7 text-xl text-red-600'>{logins}</p>
            }
            {
                success && <p className='mt-7 text-xl text-green-700'>{success}</p>
            }

                <p className='mt-1'>New to website? <Link to='/register'><span className='text-yellow-400'>please register</span></Link> </p>

        </div>
    );
};

export default Login;   