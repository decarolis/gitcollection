import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: none;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    outline: none;

    ${props =>
      props.hasError &&
      css`
        border: 1px solid #c53030;
        border-right: none;
      `}

    &::placeholder {
      color: #a8a8b3;
    }

    &:focus {
      box-shadow: inset 0 0 3px 1px #bbb;
    }
  }

  button {
    width: 160px;
    background-color: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repos = styled.div`
  margin-top: 30px;
  max-width: 760px;
  div {
    display: flex;
    align-items: center;
    div {
      margin: 0 16px;
      flex: 1;
      border: none;
      display: block;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    & + div {
      margin-top: 16px;
    }

    svg {
      margin-left: 40px;
      color: #a8a8b3;
      &:hover {
        color: #555555;
        cursor: pointer;
      }
    }
  }
  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    &:hover {
      transform: translateX(6px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const Error = styled.p`
  color: #c53030;
  margin-top: 8px;
  margin-left: 5px;
`;

export const Success = styled.p`
  color: #04d361;
  margin-top: 8px;
  margin-left: 5px;
`;
