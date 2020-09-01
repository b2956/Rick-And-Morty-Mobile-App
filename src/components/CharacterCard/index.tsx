import React, { memo } from 'react';
import styled from 'styled-components/native';

import CharacterStatus from './CharacterStatus';


export interface ICharacterProps {
    id: string
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: ILocation
    location: ILocation
    image: string
    episode: IEpisode[]
}

interface ILocation {
    name: string
    type: string
    dimension: string
}

interface IEpisode {
    id: string
    name: string
    episode: string
}

const Wrapper = styled.View`
    width: 95%;
    height: 170px;
    background-color: #606268;
    margin-bottom: 10px;
    align-self: center;
    border-radius: 10px;
    flex-direction: row;
    overflow: hidden;
`;

const CharacterImgWrapper = styled.View`
    width: 40%;
    height: 100%;
`

const CharacterImg = styled.Image`
    width: 100%;
    height: 100%;
`;

const CharacterInfoWrapper = styled.View`
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
`;

const CharacterName = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: 700;
`;

const GreyText = styled.Text`
    color: rgb(158, 158, 158);
    font-size: 13px;
    font-weight: 400;
`;

const WhiteText = styled.Text`
    color: #fff;
    margin-bottom: 10px;
    font-size: 13px;
`

const CharacterCard = ({ episode, gender, id, image, location, name, origin, species, status, type  }: ICharacterProps) => {
    return (
        <Wrapper>
            <CharacterImgWrapper>
                <CharacterImg source={{uri: image}}/>
            </CharacterImgWrapper>
            <CharacterInfoWrapper>
                <CharacterName>{name}</CharacterName>
                <CharacterStatus race={species} status={status}/>
                <GreyText>Last known location:</GreyText>
                <WhiteText>{location.name}</WhiteText>
                <GreyText>First seen in:</GreyText>
                <WhiteText>{episode[0].name}</WhiteText>
            </CharacterInfoWrapper>
        </Wrapper>
    )
}

export default memo(CharacterCard);