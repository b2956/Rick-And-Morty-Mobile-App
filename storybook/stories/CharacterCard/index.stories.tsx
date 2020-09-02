import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CharacterCard, {ICharacterProps} from '../../../src/components/CharacterCard';

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

storiesOf('CharacterCard', module)
    .add('Default', () => <CharacterCard {...CharacterProps} />);