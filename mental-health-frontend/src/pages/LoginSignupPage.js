import React from 'react';
import AuthContainer from '../components/Auth/AuthContainer';
import { PageContainer, Header } from '../styles/PageStyles';

const LoginSignupPage = () => {
    return (
        <PageContainer>
            <Header>
                <h1>Mental Health Platform</h1>
                <p>Your trusted companion for mental well-being</p>
            </Header>
            <AuthContainer />
        </PageContainer>
    );
};

export default LoginSignupPage;
