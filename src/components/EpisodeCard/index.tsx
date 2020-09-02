import React from 'react';
import styled from 'styled-components/native';

export interface IEpisodeProps {
    id: string
    name: string
    air_date: string
    episode: string
    characters: ICharacter[]
}

interface ICharacter {
    __typename: string,
    name: string
}

const Wrapper = styled.View`
    width: 95%;
    height: 200px;
    background-color: #606268;
    margin-bottom: 10px;
    align-self: center;
    border-radius: 10px;
    flex-direction: column;
    overflow: hidden;
    padding-left: 15px;
    padding-right: 15px;
    justify-content: center;
`;

const Title = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: 700;
    margin-bottom: 10px;
`;

const EpisodeInfoWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`;

const EpisodeInfoBlock = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
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
`;

const EpisodeCard = ({id, name, air_date, episode, characters}: IEpisodeProps) => {
    const charactersList = characters.reduce((reducer, item, index) => {
        if(index === 0) return item.name;
        if(reducer.length >= 150 && index === characters.length - 1) return `${reducer} ...`;
        if(reducer.length >= 150) return `${reducer}`;
        return `${reducer} | ${item.name}`;
    }, '');

    return (
        <Wrapper>
            <Title>{name}</Title>
            <EpisodeInfoWrapper>
                <EpisodeInfoBlock>
                    <GreyText>Air Date:</GreyText>
                    <WhiteText>{air_date}</WhiteText>
                </EpisodeInfoBlock>
                <EpisodeInfoBlock>
                    <GreyText>Episode:</GreyText>
                    <WhiteText>{episode}</WhiteText>
                </EpisodeInfoBlock>
            </EpisodeInfoWrapper>
            <GreyText>Characters present:</GreyText>
            <WhiteText>{charactersList}</WhiteText>
        </Wrapper>
    )
};

export default EpisodeCard;