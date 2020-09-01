import React, { memo } from 'react';
import styled from 'styled-components/native';

interface ICharacterStatus {
    status: string, 
    race: string
}

const Wrapper = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
`;

const StatusColor = styled.View`
    height: 7px;
    width: 7px;
    border-radius: 3.5px;
    background-color: ${props => {
        if(props.status === 'Alive')  return '#55cc44';
        if(props.status === 'Dead') return '#d63d2e';
        return 'gold';
    }};
`;

const StatusText = styled.Text`
    font-size: 13px;
    color: #fff;
    margin-left: 5px;
`;

const CharacterStatus = ({ status, race }: ICharacterStatus ) => {
    return (
        <Wrapper>
            <StatusColor status={status} />
                <StatusText>{status} - {race}</StatusText>
        </Wrapper>
    )
}

export default memo(CharacterStatus);