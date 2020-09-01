import React, { useCallback, useEffect, useState } from 'react';
import { FlatList , ActivityIndicator, ListRenderItemInfo } from 'react-native';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/client';

import CharacterCard, { ICharacterProps } from '../../components/CharacterCard';
import ApolloCharacterService  from '../../services/ApolloCharacterService';

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #fff;
    justify-content: center;
    align-items: center;
`;

const ListWrapper = styled.ScrollView`
    width: 100%;
    flex: 1;
    background-color: #999;
`

const CharactersList = () => {
    const [characterList, setCharacterList] = useState([]);

    const { loading, error, data } = useQuery(ApolloCharacterService.getCharacters(1));

    if(data) console.log(data.characters.results); 

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

    // const renderCharacterCardCallback = useCallback(({ item, index }: { item: ICharacterProps, index: number }) => renderCharacterCard({ item, index }));

    return (
        <Wrapper>
            { loading && <ActivityIndicator color="baby-blue" size='large' /> }
            { data && 
                <FlatList
                    style={{
                        width: '100%',
                        backgroundColor: '#323541',
                    }}
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        paddingVertical: 10
                    }}
                    data={data.characters.results}
                    renderItem={renderCharacterCard}
                />

                // <ListWrapper>
                // {
                //     data.characters.results.map((item, index) => {
                //         <CharacterCard
                //             episode={item.episode}  
                //             gender={item.gender}
                //             id={item.id}
                //             image={item.image}
                //             location={item.location}
                //             name={item.name}
                //             origin={item.origin}
                //             species={item.species}
                //             status={item.status}
                //             type={item.type}
                //             key={index}
                //         />
                //     })
                // }
                // </ListWrapper>

            }
        </Wrapper>    
    )
}

export default CharactersList;