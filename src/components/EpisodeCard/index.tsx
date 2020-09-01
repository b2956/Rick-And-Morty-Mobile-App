import React from 'react';
import styled from 'styled-components/native';

export interface IEpisodeProps {
    id: string
    name: string
    air_date: string
    episode: string
}

const Wrapper = styled.View`
    width: 95%;
    height: 100px;
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

const EpisodeCard = ({id, name, air_date, episode}: IEpisodeProps) => {
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
        </Wrapper>
    )
};

export default EpisodeCard;