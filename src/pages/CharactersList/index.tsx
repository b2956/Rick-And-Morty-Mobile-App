import React, { useCallback, useEffect, useState } from 'react';
import { FlatList , ActivityIndicator, ListRenderItemInfo } from 'react-native';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/client';

import CharacterCard, { ICharacterProps } from '../../components/CharacterCard';
import SearchBar from '../../components/SearchBar';

import ApolloCharacterService  from '../../services/ApolloCharacterService';

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #323541;
    justify-content: center;
    align-items: center;
`;

const CharactersList = () => {

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

        if (loading) return <ActivityIndicator color="baby-blue" size='large' />;

        // if(data) console.log(data.characters.result);

        if (data) return  (
            <React.Fragment>
                <SearchBar/>
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
            {useFetchCharacters()}
        </Wrapper>    
    )
}

export default CharactersList;