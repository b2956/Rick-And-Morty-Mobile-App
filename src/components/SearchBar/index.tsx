import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';

interface ISearchBarProps {
    inputValue: string,
    placeholder: string,
    options: string[],
    changeInputHandler: Function,
    changeResultsFilter: Function
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
    /* flex: 1; */
    width: 60%;
    height: 40px;
    border-radius: 10px;
    background-color: rgb(158, 158, 158);
    color: #fff;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid #fff;
`;

const PickerWrap = styled.View`
    height: 40px;
    flex: 1;
    background-color: rgb(158, 158, 158);
    border-radius: 10px;
    border: 1px solid #fff;
    margin-left: 5px;
`;

const SearchBar = ({inputValue, placeholder, options, changeInputHandler, changeResultsFilter}: ISearchBarProps) => {
    const [pickerOption, setPickerOption] = useState(0);

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
            <PickerWrap>
                <Picker
                    selectedValue={options[pickerOption]}
                    style={{
                        height: 40,
                        flex: 1,
                        color: '#fff'
                    }}
                    onValueChange={(itemValue, index) => {
                        changeResultsFilter(itemValue)
                        setPickerOption(index);
                    }}
                    
                >
                    {options.map((option, index) => <Picker.Item label={option} value={option} key={index} testID={`pickerItem${index}`} /> )}
                </Picker>
            </PickerWrap>
        </Wrapper>
    )
};

const styles = StyleSheet.create({
    picker: {
        height: 40, 
        width: 150,
        backgroundColor: 'rgb(158, 158, 158)',
        color: '#fff',
        marginHorizontal: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000'
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