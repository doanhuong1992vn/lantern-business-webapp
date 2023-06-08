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
import * as userService from "~/services/userService";
import AuthContext from "~/security/AuthContext"
import isEmpty from "validator/es/lib/isEmpty";
import {isInvalidFullName, isInvalidPassword, isInvalidUsername} from "~/validations/validation";
import isEmail from "validator/es/lib/isEmail";
import isMobilePhone from "validator/es/lib/isMobilePhone";

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
    const [errFullName, setErrFullName] = useState('');
    const [errUsername, setErrUsername] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [errPhone, setErrPhone] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [errRepeatPassword, setErrRepeatPassword] = useState('');
    const [errLoginUsername, setErrLoginUsername] = useState('');

    const {user, login} = useContext(AuthContext);

    const errEmpty = "* Ô không được để trống!";


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

    const handleBlurLoginUsernameInput = (e) => {
        let username = e.target ? e.target.value : '';
        setErrLoginUsername('');
        if (username) {
            userService.isExistsByData("username", e.target.value)
                .then(response => {
                    if (!response || response.status !== 200) {
                        setErrLoginUsername(`* Username "${e.target.value}" không tồn tại!`)
                    }
                })
                .catch(err => console.log(err))
        } else {
            setErrLoginUsername(errEmpty);
        }
    }

    const handleOnClickSignIn = async () => {
        if (errLoginUsername || !loginRequest.username || !loginRequest.password) {
            setMessageResponse("* Vui lòng nhập đầy đủ thông tin đăng nhập!")
        }
        try {
            await login(loginRequest);
            setLoginRequest(newLoginRequest);
            if (!user) {
                setMessageResponse("* Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin!")
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

    const handleBlurFullNameInput = (e) => {
        const fullName = e.target ? e.target.value : e;
        setErrFullName('');
        if (isEmpty(fullName)) {
            setErrFullName(errEmpty);
        } else if (fullName.length < 2 || fullName.length > 50) {
            setErrFullName("* Full name phải từ 2-50 ký tự")
        } else if (isInvalidFullName(fullName)) {
            setErrFullName("* Full name không được chứa số hoặc ký tự đặc biệt")
        }
    }

    const handleBlurUsernameRegisterInput = async (e) => {
        let username = e.target ? e.target.value : e;
        setErrUsername('');
        if (isEmpty(username)) {
            setErrUsername(errEmpty);
        } else if (username.length < 8 || username.length > 20) {
            setErrUsername("* Username phải từ 6-20 ký tự")
        } else if (isInvalidUsername(username)) {
            setErrUsername("* Username không được chứa ký tự đặc biệt")
        } else {
            await userService.isExistsByData("username", username)
                .then(response => {
                    if (response && response.status === 200) {
                        setErrUsername(`* Username "${username}" đã được sử dụng!`)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const handleBlurEmailInput = async (e) => {
        let email = e.target ? e.target.value : e;
        setErrEmail('');
        if (isEmpty(email)) {
            setErrEmail(errEmpty);
        } else if (!isEmail(email)) {
            setErrEmail("* Vui lòng nhập đúng định dạng email")
        } else {
            await userService.isExistsByData("email", email)
                .then(response => {
                    if (response && response.status === 200) {
                        setErrEmail(`* Email "${email}" đã được sử dụng!`)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const handleBlurPhoneInput = async (e) => {
        let phone = e.target ? e.target.value : e;
        setErrPhone('');
        if (isEmpty(phone)) {
            setErrPhone(errEmpty);
        } else if (!isMobilePhone(phone, 'vi-VN')) {
            setErrPhone("* Vui lòng nhập đúng định dạng SĐT tại Việt Nam")
        } else {
            await userService.isExistsByData("phone", phone.slice(-9))
                .then(response => {
                    if (response && response.status === 200) {
                        setErrPhone(`* Phone number "${phone}" đã được sử dụng!`)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const handleBlurPasswordInput = (e) => {
        let password = e.target ? e.target.value : e;
        setErrPassword('');
        if (isEmpty(password)) {
            setErrPassword(errEmpty);
        } else if (!isInvalidPassword(password)) {
            setErrPassword("* Mật khẩu chưa đủ mạnh, phải có ít nhất 8 ký tự " +
                "gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.")
        }
    }

    const handleBlurRePasswordInput = (e) => {
        let rePassword = e.target ? e.target.value : e;
        setErrRepeatPassword('');
        if (isEmpty(rePassword)) {
            setErrRepeatPassword(errEmpty);
        } else if (rePassword !== registerRequest.password) {
            setErrRepeatPassword("* Mật khẩu không trùng khớp");
        }
    }

    const handleClickSignUp = async () => {
        handleBlurRePasswordInput(registerRequest.repeatPassword);
        handleBlurPasswordInput(registerRequest.password);
        handleBlurFullNameInput(registerRequest.fullName);
        await handleBlurPhoneInput(registerRequest.phone);
        await handleBlurEmailInput(registerRequest.email);
        await handleBlurUsernameRegisterInput(registerRequest.username);
        if (errFullName || errUsername || errEmail || errPhone || errPassword || errRepeatPassword) {
            setMessageResponse("* Vui lòng nhập đầy đủ thông tin đăng ký");
            return;
        }
        const newUser = {
            fullName: registerRequest.fullName,
            username: registerRequest.username,
            email: registerRequest.email,
            phone: registerRequest.phone,
            password: registerRequest.password
        }
        console.log(newUser)
        await userService.register(newUser)
            .then((response) => {
                if (!response) {
                    setMessageResponse("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin!");
                }
                if (response && response.status === 201) {
                    setMessageResponse(response.data.message);
                    setRegisterRequest(newRegisterRequest);
                    setJustifyActive("loginTab")
                }
            })
            .catch(error => {
                console.log("Lỗi: " + error)
            });
    }

    const labelFullName = (
        <div>
            <p>Full name <sup style={{color: "red"}}>*</sup></p>
        </div>
    )
    const labelUsername = (
        <div>
            <p>Username <sup style={{color: "red"}}>*</sup></p>
        </div>
    )
    const labelEmail = (
        <div>
            <p>Email <sup style={{color: "red"}}>*</sup></p>
        </div>
    )
    const labelPhone = (
        <div>
            <p>Phone number <sup style={{color: "red"}}>*</sup></p>
        </div>
    )
    const labelPassword = (
        <div>
            <p>Password <sup style={{color: "red"}}>*</sup></p>
        </div>
    )
    const labelRePassword = (
        <div>
            <p>Repeat password <sup style={{color: "red"}}>*</sup></p>
        </div>
    )

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
                                              onBlur={handleBlurLoginUsernameInput}
                                              wrapperClass='' label="Username" type='text'/>
                                    <small className="p-error">{errLoginUsername}</small>
                                    <MDBInput onChange={(e) => handleChangeInputLogin(e, "password")}
                                              value={loginRequest.password}
                                              wrapperClass='mt-3' label="Password" type='password'/>
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
                                              onBlur={handleBlurFullNameInput}
                                              label={labelFullName}
                                              wrapperClass='' type='text' maxLength={51}/>
                                    <small className="p-error">{errFullName}</small>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "username")}
                                              onBlur={handleBlurUsernameRegisterInput}
                                              label={labelUsername}
                                              wrapperClass='mt-3' type='text'/>
                                    <small className="p-error">{errUsername}</small>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "email")}
                                              label={labelEmail}
                                              onBlur={handleBlurEmailInput}
                                              wrapperClass='mt-3' type='email'/>
                                    <small className="p-error">{errEmail}</small>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "phone")}
                                              label={labelPhone}
                                              onBlur={handleBlurPhoneInput}
                                              wrapperClass='mt-3' type='text'/>
                                    <small className="p-error">{errPhone}</small>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "password")}
                                              label={labelPassword}
                                              onBlur={handleBlurPasswordInput}
                                              wrapperClass='mt-3' type='password'/>
                                    <small className="p-error">{errPassword}</small>
                                    <MDBInput onChange={(event) => handleChangeInputRegister(event, "repeatPassword")}
                                              label={labelRePassword}
                                              onBlur={handleBlurRePasswordInput}
                                              wrapperClass='mt-3' type='password'/>
                                    <small className="p-error">{errRepeatPassword}</small>
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