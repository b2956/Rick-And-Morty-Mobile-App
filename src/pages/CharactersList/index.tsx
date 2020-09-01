import React, {useState, useEffect} from 'react';
import { FlatList , ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/client';

import CharacterCard, { ICharacterProps } from '../../components/CharacterCard';
import SearchBar from '../../components/SearchBar';

import ApolloCharacterService  from '../../services/ApolloCharacterService';

interface IFilterOptions {
    searchValue: string,
    searchOption: string,
    isSearching: boolean
}

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #323541;
    justify-content: flex-start;
    align-items: center;
`;

const CharactersList = () => {
    const [filterOptions, setFilterOptions] = useState({
        isSearching: true,
        searchOption: 'name',
        searchValue: 'morty'
    } as IFilterOptions);
    const [isFiltered, setIsFiltered] = useState(false);

    const changeInputHandler = (inputValue: string) => {
        const isSearching = inputValue === '' ? false : true;

        console.log(inputValue);

        setFilterOptions(prevState => {
            return {
                ...prevState,
                searchValue: inputValue,
                isSearching
            }
        })
    }

    const renderCharacterCard = ({ item, index }: { item: ICharacterProps, index: number }) => {
        return (
            <CharacterCard 
                episode={item.episode}  
                gender={item.gender}
                id={item.id}
                image={item.image}
                location={item.location}
                name={item.name}
                origin={item.origin}
                species={item.species}
                status={item.status}
                type={item.type}
                key={index}
            />
        )
    }

    const Loader = <ActivityIndicator color="baby-blue" size='large' style={{flex: 1, justifyContent: 'center' }}/>;

    function useFetchCharacters() {
        const { loading, error, data, fetchMore } = useQuery(ApolloCharacterService.getCharacters(), {
            variables: {
                page: 1
            }
        });

        if (loading) return Loader;

        // if(data) console.log(data.characters.result);

        if (data) return  (
            <React.Fragment>
                <FlatList
                    style={{ width: '100%' }}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                        backgroundColor: '#323541'
                    }}
                    data={data.characters.results}
                    renderItem={renderCharacterCard}
                    onEndReached={() => {

                        fetchMore({
                            variables: {
                                page: data.characters.info.next
                            },
                            updateQuery: (prev: any, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;

                                const newData = {
                                    characters: {
                                        info: fetchMoreResult.characters.info,
                                        results: [
                                            ...prev.characters.results, ...fetchMoreResult.characters.results
                                        ]
                                    }
                                }
                                return newData;
                            }
                        });
                    }
                }
                />
            </React.Fragment>
        )
    }

    function useFetchFilteredCharacters () {
        const setFilterVariable = () => {
            switch(filterOptions.searchValue) {
                case 'name':
                    return {name: filterOptions.searchValue}
                case 'status':
                    return {status: filterOptions.searchValue}
                case 'species':
                    return {species: filterOptions.searchValue}
                case 'type':
                    return {type: filterOptions.searchValue}
                case 'gender':
                    return {gender: filterOptions.searchValue}
                default:
                    return {name: filterOptions.searchValue}
            }
        }

        const filter = setFilterVariable();

        const { loading, error, data, fetchMore } = useQuery(ApolloCharacterService.getFilteredCharacters(filterOptions.searchOption), {
            variables: {
                page: 1,
                filter: filterOptions.searchValue
            }
        });

        if (loading) return Loader;

        // if(error) console.log(error);

        if(data) console.log(data.characters.result);

        if (data) return  (
            <React.Fragment>
                <FlatList
                    style={{ width: '100%' }}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        paddingVertical: 10,
                        backgroundColor: '#323541'
                    }}
                    data={data.characters.results}
                    renderItem={renderCharacterCard}
                    onEndReached={() => {
                        console.log(data.characters.info.next);
                        fetchMore({
                            variables: {
                                page: data.characters.info.next
                            },
                            updateQuery: (prev: any, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;

                                const newData = {
                                    characters: {
                                        info: fetchMoreResult.characters.info,
                                        results: [
                                            ...prev.characters.results, ...fetchMoreResult.characters.results
                                        ]
                                    }
                                }
                                return newData;
                            }
                        });
                    }
                }
                />
            </React.Fragment>
        )
    }

    return (
        <Wrapper>
            <SearchBar
                placeholder="Search Character" 
                options= {[
                    'name',
                    'status',
                    'species',
                    'type',
                    'gender'   
                ]}
                changeInputHandler={changeInputHandler}
                inputValue={filterOptions.searchValue}
            />
            { !filterOptions.isSearching &&
                useFetchCharacters()
            }
            { filterOptions.isSearching && 
                useFetchFilteredCharacters()
            }
        </Wrapper>    
    )
}

export default CharactersList;