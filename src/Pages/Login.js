import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useLogin from "../hooks/useLogin";
import { useToasts } from 'react-toast-notifications';

export default function Login() {
      const [identifier, setIdentifier] = useState("");
      const [password, setPassword] = useState("");
      const loginMutation = useLogin();
      const { addToast } = useToasts();
      const {dispatch} = useContext(AuthContext)

      async function handleLogin(e) {
            e.preventDefault();
            if(!identifier) {
              addToast('please enter email address', { appearance: 'error', autoDismiss: true });
              return;
            }
            
            if(!password) {
              addToast('please enter password', { appearance: 'error', autoDismiss: true });
              return;
            }

            let data = {
                  identifier, password
            }  
            await loginMutation.mutate(data, {
                  onSuccess: (data) => {
                        // console.log(data)
                        // return;
                        if(data.statusCode === 400){
                              addToast("error found", { appearance: 'error', autoDismiss: true });
                        }
                        addToast('Login successfully', { appearance: 'success', autoDismiss: true });
                        let access_token = data?.data?.jwt
                        let user_id = data?.data?.user?.id
                        let fullname = data?.data?.user?.username
                        let email = data?.data?.user?.email
                        let isLoggedIn = true;
                        localStorage.setItem('access_token', access_token)
                        localStorage.setItem('fullname', fullname);
                        localStorage.setItem('user_id', user_id);
                        localStorage.setItem('email', email);
                        localStorage.setItem('isLoggedIn', isLoggedIn);
                        const payloadData = {
                              isLoggedIn,
                              fullname,
                              user_id,
                              email,
                              access_token,
                          }
                          if(isLoggedIn){
                              dispatch({type: 'LOGIN', payload: payloadData});
                              let callBack = localStorage.getItem('callbackurl')
                              if(callBack){
                                window.location.href = callBack;
                                localStorage.removeItem('callbackurl');
                              }else{
                                window.location.href = `/add-products`;
                              }
                              
                          }
                        console.log(data.data)
                  },
                  onError: () => {
                    addToast('please enter correct email or password', { appearance: 'error', autoDismiss: true });
                    return;
                  }
            })
            
      }

  return (
    <div className="row main-content">
      <div className="col-md-3 offset-4">
        <h2>Account Login</h2>
        <hr />
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input 
                  type="text" 
                  placeholder="email" 
                  className="form-control" 
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-md btn-success text-white w-100">
              <span className="fa fa-lock mr-1"></span>
                  Login your account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
