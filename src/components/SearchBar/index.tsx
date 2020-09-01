import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: #323541;
    padding-left: 10px;
    padding-right: 10px;
`;

const Input = styled.TextInput`
    width: 75%;
    height: 40px;
    border-radius: 10px;
    background-color: rgb(158, 158, 158);
    color: #fff;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid #fff;
`;

const SearchButton = styled.TouchableOpacity`
    height: 40px;
    margin-left: 5px;
    flex: 1;
    background-color: #fff;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.Text`
    font-size: 15px;
    font-weight: 700;
    color: #323541;
`;


const SearchBar = () => {
    return (
        <Wrapper>
            <Input  placeholder="Search character by name..." placeholderTextColor="#fff" />
            <SearchButton>
                <ButtonText>Search</ButtonText>
            </SearchButton>
        </Wrapper>
    )
}

export default SearchBar;