import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { AuthCard, ToggleText } from '../../styles/AuthStyles';

const AuthContainer = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => setIsLogin(!isLogin);

    return (
        <AuthCard>
            {isLogin ? <LoginForm /> : <SignupForm />}
            <ToggleText onClick={toggleAuthMode}>
                {isLogin ? "Don’t have an account? Sign Up" : 'Already have an account? Login'}
            </ToggleText>
        </AuthCard>
    );
};

export default AuthContainer;
