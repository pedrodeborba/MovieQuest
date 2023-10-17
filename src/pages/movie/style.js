import styled from "styled-components";

export const ContainerMovie = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(56,1,153,1) 38%, rgba(28,0,96,1) 100%);
    padding: 10px;
    h1,h3,h4,p{
        color: #fff;
    }
    @media (max-width: 798px) {
        .img_movie{
            width: 200px;
            height: 300px;
        }
      }
`;