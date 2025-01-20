import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #d4edda, #f8f9fa); /* Soft pastel gradient */
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: 40px;

    h1 {
        font-size: 2.5rem;
        color: #2c3e50;
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    p {
        font-size: 1.2rem;
        color: #6c757d;
        margin: 10px 0 0;
        font-family: 'Roboto', sans-serif;
    }
`;
