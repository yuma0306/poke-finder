// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';
import { pikachuImgEndpoint } from '../../constants/api';

const pokemon: any = {
    "25": {
        name: 'pikachu',
        sprites: {
            front_default: pikachuImgEndpoint,
        },
    },
}

export const handlers = [
    http.get('https://pokeapi.co/api/v2/pokemon/:id', ( { params }: { params: {id: string}} ) => {
        const id = params.id;
        const pokemonData = pokemon[id];
        if(pokemonData) {
            return HttpResponse.json(
                {...pokemonData},
                {status: 200}
            );
        } else {
            return HttpResponse.json(
                {message: 'Pokemon not found',},
                {status: 404},
            );
        }
    }),
]