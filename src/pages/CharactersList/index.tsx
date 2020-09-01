import React, {useState} from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/client';

import CharacterCard, { ICharacterProps } from '../../components/CharacterCard';
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';

import ApolloCharacterService  from '../../services/ApolloCharacterService';

interface IFilterOptions {
    searchValue: string,
    searchOption: 'name' | 'status' | 'species' | 'type' | 'gender',
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

    function useFetchCharacters() {
        const { loading, error, data, fetchMore } = useQuery(ApolloCharacterService.getCharacters(), {
            variables: {
                page: 1
            }
        });

        if (loading) return <Loader/>;

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
                        if(!data.characters.info.next) return;
                        
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

        const { loading, error, data, fetchMore } = useQuery(ApolloCharacterService.getFilteredCharacters(filterOptions.searchOption), {
            variables: {
                page: 1,
                filter: filterOptions.searchValue
            }
        });

        if (loading) return <Loader/>;

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
                        if(!data.characters.info.next) return;

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