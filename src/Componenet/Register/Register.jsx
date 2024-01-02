import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { Profiler, useState } from 'react';
import app from '../../Firebase/firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {

    const [logins, setlogins] = useState(''); // eta error er jonno korsi
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState('false');

    const handleRegistation = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name, email, password);
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
    
        const auth = getAuth(app)
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            console.log(result.user)
            setSuccess('user created successfully')

            //Update profile
            updateProfile(result.user, {
                displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                console.log("Profiler updated")
              }).catch(error => {
                console.log(error)
              });
            
            //User Varification
            sendEmailVerification(result.user)
            .then(()=>{
                alert("Cheek your email and verify this!")
            })
        })
        .catch(error=>{
            console.log(error)
            setlogins(error.message)
        })

    }


    return (
        <div>
            <h1 className='text-4xl mt-20 text-red-500'>Please Register</h1>
            <form onSubmit={handleRegistation} className="max-w-sm mx-auto mt-6">
                <div className="mb-5">
                    <input type="text" name='name' id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your Name" required />
                </div>
                <div className="mb-5">
                    <input type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Adress" required />
                </div>
                <div className="mb-5 relative">
                    <input type={showPassword ? "text" : "password"} name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                        <span className='absolute mt-1 right-2' onClick={ () => setShowPassword(!showPassword)}>
                            {showPassword? <FaEye></FaEye>:<FaEyeSlash></FaEyeSlash>}
                        </span>
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
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

                <p className='mt-1'>Previous register to website? <Link to='/login'><span className='text-yellow-400'>please login</span></Link> </p>
            
        </div>
    );
};

export default Register;