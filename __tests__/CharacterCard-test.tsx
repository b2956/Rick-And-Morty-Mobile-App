import React from 'react';
import renderer from 'react-test-renderer';
import CharacterCard, { ICharacterProps } from '../src/components/CharacterCard';

describe('Character Card', () => {
    const CharacterProps: ICharacterProps = {
        episodes: [
            {   
                id: '1',
                name: 'S01E01',
                episode: 'Pilot'
            },
            {   
                id: '2',
                name: 'S01E02',
                episode: 'Lawnmower Dog'
            }
        ],
        gender: 'male',
        id: '1',
        image: 'https://rickandmortyapi.com/api/location/64',
        location: {
            dimension: '267c',
            name: 'Earth',
            type: 'planet'
        },
        name: 'Rick',
        origin: {
            dimension: '267c',
            name: 'Earth',
            type: 'planet'
        },
        species: 'Human',
        status: 'Alive',
        type: 'Human'
    };

    it('Should render the Character Card component correctly', () => {
        const tree = renderer.create(<CharacterCard {...CharacterProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});