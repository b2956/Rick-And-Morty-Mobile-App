import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';

interface ISearchBarProps {
    inputValue: string,
    placeholder: string,
    options: string[],
    changeInputHandler: Function,
    filterResults: Function
}

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
    width: 50%;
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


const SearchBar = ({inputValue, placeholder, options, changeInputHandler, filterResults}: ISearchBarProps) => {

    const changeInput = (inputValue: string) => {
        console.log(inputValue);
        changeInputHandler(inputValue);
    }

    return (
        <Wrapper>
            <Input  
                placeholder={placeholder} 
                placeholderTextColor="#fff"  
                defaultValue={inputValue} 
                onChangeText={(text: string) => changeInput(text)} 
            />
            {/* <TextInput placeholder={placeholder} placeholderTextColor="#fff"  defaultValue={inputValue} onChangeText={(text: string) => inputChangeHandler(text) }  style={styles.textInput} /> */}
            <Picker
                selectedValue={options[0]}
                style={styles.picker}
                itemStyle={styles.item}
            >
                {options.map((option, index) => <Picker.Item label={option} value={option} key={index} testID={`pickerItem${index}`} /> )}
                </Picker>
            <SearchButton onPress={filterResults} >
                <ButtonText>Search</ButtonText>
            </SearchButton>
        </Wrapper>
    )
};

const styles = StyleSheet.create({
    picker: {
        height: 40, 
        width: 100,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        borderRadius: 20
    },
    item: {
        width: '100%',
    },
    textInput: {
        width: '50%',
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgb(158, 158, 158)',
        color: '#fff',
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderColor: '#fff'
    }
})

export default SearchBar;