import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Login = ({onSubmit}) => {
    const [emailVal, setEmailVal] = useState(``);
    const [passwordVal, setPasswordVal] = useState(``);

    const formSubmitHandler = (evt, emailVal, passwordVal) => {
        evt.preventDefault();

        onSubmit(emailVal, passwordVal);
    }

    return (
        <main className="page__main page__main--login">
            <div className="page__login-container container">
                <section className="login">
                    <h1 className="login__title">Sign in</h1>
                    <form className="login__form form" action="#" method="post"
                        onSubmit={(evt) => formSubmitHandler(evt, emailVal, passwordVal)}
                    >
                        <div className="login__input-wrapper form__input-wrapper">
                            <label className="visually-hidden">E-mail</label>
                            <input className="login__input form__input" type="email" name="email"
                                placeholder="Email" value={emailVal}
                                onChange={(evt) => setEmailVal(evt.target.value)} required
                            />
                        </div>
                        <div className="login__input-wrapper form__input-wrapper">
                            <label className="visually-hidden">Password</label>
                            <input className="login__input form__input" type="password" name="password"
                                placeholder="Password" value={passwordVal}
                                onChange={(evt) => setPasswordVal(evt.target.value)} required
                            />
                        </div>
                        <button className="login__submit form__submit button" type="submit">Sign in</button>
                    </form>
                </section>
                <section className="locations locations--login locations--current">
                    <div className="locations__item">
                        <a className="locations__item-link" href="#">
                            <span>Amsterdam</span>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Login;
