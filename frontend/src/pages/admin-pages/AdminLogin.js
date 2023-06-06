import React, {useContext, useState} from 'react';
import {
    MDBBtn,
    MDBCheckbox,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import './AdminLogin.css';
import * as userService from "~/services/UserService";
import AuthContext from "~/security/AuthContext"

const AdminLogin = () => {
    let newLoginRequest = {
        username: '',
        password: '',
    }
    let newRegisterRequest = {
        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: '',
    }

    const [loginRequest, setLoginRequest] = useState(() => newLoginRequest);
    const [registerRequest, setRegisterRequest] = useState(() => newRegisterRequest);
    const [justifyActive, setJustifyActive] = useState('loginTab');
    const [messageResponse, setMessageResponse] = useState('');
    const {user, login} = useContext(AuthContext);


    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setMessageResponse('');
        setJustifyActive(value);
    };


    const handleChangeInputLogin = (e, field) => {
        const value = (e.target && e.target.value) || '';
        let newLoginRequest = {...loginRequest};
        newLoginRequest[`${field}`] = value;
        setLoginRequest(newLoginRequest);
    }

    const handleOnClickSignIn = async () => {
        try {
            await login(loginRequest);
            setLoginRequest(newLoginRequest);
            if (!user) {
                setMessageResponse("Đăng nhập thất bại! Vui lòng nhập lại thông tin!")
            }
        } catch (err) {

        }
    }

    const handleChangeInputRegister = (e, field) => {
        const value = (e.target && e.target.value) || '';
        let newRegisterRequest = {...registerRequest};
        newRegisterRequest[`${field}`] = value;
        setRegisterRequest(newRegisterRequest);
    }

    const handleClickSignUp = async () => {
        const newUser = {
            fullName: registerRequest.fullName,
            username: registerRequest.username,
            email: registerRequest.email,
            phone: registerRequest.phone,
            password: registerRequest.password
        }
        await userService.register(newUser)
            .then((response) => {
                if (response && response.status === 201) {
                    setMessageResponse(response.data.message);
                    setJustifyActive("loginTab")
                    setRegisterRequest(newRegisterRequest);
                }
            })
            .catch(error => {
                console.log(error)
                setMessageResponse("Đăng ký thất bại! Vui lòng nhập lại thông tin!");
            });
    }

    return (
        <MDBContainer className="my-5 gradient-form">
            <MDBRow>
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5 text-black">
                        <div className="text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                 style={{width: '230px'}} alt="logo"/>
                            <h4 className="mt-1 mb-2 pb-1">Lantern Business Web Application</h4>
                        </div>
                        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

                            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                                <MDBTabsItem>
                                    <MDBTabsLink className="gradient-custom-2"
                                                 onClick={() => handleJustifyClick('loginTab')}
                                                 active={justifyActive === 'loginTab'}>
                                        Login
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <MDBTabsLink className="gradient-custom-2"
                                                 onClick={() => handleJustifyClick('registerTab')}
                                                 active={justifyActive === 'registerTab'}>
                                        Register
                                    </MDBTabsLink>
                                </MDBTabsItem>
                            </MDBTabs>
                            <MDBTabsContent>
                                <MDBTabsPane show={justifyActive === 'loginTab'}>
                                    <div className="text-center mb-3">
                                        <p>Sign in with:</p>
                                        <div className='d-flex justify-content-between mx-auto' style={{width: '50%'}}>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                                <MDBIcon fab icon='facebook-f' size="sm"/>
                                            </MDBBtn>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                                <MDBIcon fab icon='twitter' size="sm"/>
                                            </MDBBtn>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                                <MDBIcon fab icon='google' size="sm"/>
                                            </MDBBtn>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                                <MDBIcon fab icon='github' size="sm"/>
                                            </MDBBtn>
                                        </div>
                                        <p className="text-center mt-3">or:</p>
                                    </div>
                                    <MDBInput onChange={(e) => handleChangeInputLogin(e, "username")}
                                              value={loginRequest.username}
                                              wrapperClass='mb-4' label='Username' type='text'/>
                                    <MDBInput onChange={(e) => handleChangeInputLogin(e, "password")}
                                              value={loginRequest.password}
                                              wrapperClass='mb-4' label='Password' type='password'/>
                                    <div className="d-flex justify-content-between mx-4 mb-4">
                                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault'
                                                     label='Remember me'/>
                                        <a href="#!">Forgot password?</a>
                                    </div>
                                    <p className="text-center text-primary">{messageResponse}</p>
                                    <MDBBtn onClick={handleOnClickSignIn} className="mb-4 w-100 gradient-custom-2">
                                        Sign in
                                    </MDBBtn>
                                    <p className="text-center">Not a member?
                                        <MDBBtn type="button" className="gradient-custom-2 ml-3"
                                                onClick={() => handleJustifyClick('registerTab')}>
                                            Register
                                        </MDBBtn>
                                    </p>
                                </MDBTabsPane>

                                <MDBTabsPane show={justifyActive === 'registerTab'}>
                                    <div className="text-center mb-3">
                                        <p>Sign up with:</p>
                                        <div className='d-flex justify-content-between mx-auto' style={{width: '50%'}}>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                                <MDBIcon fab icon='facebook-f' size="sm"/>
                                            </MDBBtn>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                                <MDBIcon fab icon='twitter' size="sm"/>
                                            </MDBBtn>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                                <MDBIcon fab icon='google' size="sm"/>
                                            </MDBBtn>
                                            <MDBBtn tag='a' color='none' className='m-1' style={{color: '#1266f1'}}>
                                                <MDBIcon fab icon='github' size="sm"/>
                                            </MDBBtn>
                                        </div>
                                        <p className="text-center mt-3">or:</p>
                                    </div>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "fullName")}
                                              wrapperClass='mb-4' label='Full Name' type='text'/>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "username")}
                                              wrapperClass='mb-4' label='Username' type='text'/>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "email")}
                                              wrapperClass='mb-4' label='Email' type='email'/>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "phone")}
                                              wrapperClass='mb-4' label='Phone' type='text'/>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "password")}
                                              wrapperClass='mb-4' label='Password' type='password'/>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "repeatPassword")}
                                              wrapperClass='mb-4' label='Repeat Password' type='password'/>
                                    <p className="text-center text-primary">{messageResponse}</p>
                                    <MDBBtn onClick={handleClickSignUp} className="mb-4 w-100 gradient-custom-2 mt-3">
                                        Sign up
                                    </MDBBtn>
                                </MDBTabsPane>
                            </MDBTabsContent>
                        </MDBContainer>
                    </div>
                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default AdminLogin;