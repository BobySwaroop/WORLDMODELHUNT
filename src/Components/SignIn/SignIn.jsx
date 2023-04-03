import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

function SignIn() {
const navigate = useNavigate();
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
// }

// const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
// }

const handleSubmit =(e) => {
  e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(value => {navigate("/dashboard");}).catch((err) => alert(err));

};



  return (
    <>
    <Navbar/>
    <>
      <div className='container bg-dark w-75 main-contianer'>
        <div className='row Pre p-5'>
          <div className='col-10 mx-auto'>
            <div className='row text-center'>
              <h1 className='text-danger'>LogIn</h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='container bg-light w-75 main-contianer'>
          <div className='row p-5'>
            <div className='col-10 mx-auto'>
                <div className="row w-50 mx-auto">
                    <div className="col-md-12">
                        <input className='form-control m-2' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input   className='form-control m-2' type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="row w-50 mx-auto">
                    <div className="col-md-12">
                       <Link to={"/dashboard"} className='btn btn-success w-100 m-2' onClick={handleSubmit} >Log In</Link>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
    </>

  );
}

export default SignIn;
