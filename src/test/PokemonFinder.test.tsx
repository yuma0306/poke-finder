/**
 * test
 */
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
/**
 * components
 */
import PokemonFinder from '../components/PokemonFinder';
/**
 * constans
 */
import { pikachuImgEndpoint } from '../constants/api';

describe('PokemonFinder', () => {
    test('初期レンダリングが正しく行われるか', () => {
        render(<PokemonFinder />);
        expect(screen.getByText('ポケモンファインダー')).toBeInTheDocument();
        expect(screen.getByText('ポケモンを見つける')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'ポケモンを見つける' })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('ポケモンのIDを入力')).toBeInTheDocument();
    });

    test('ボタンクリックでポケモンのデータがフェッチ・表示されるか', async () => {
        render(<PokemonFinder />);
        const user = userEvent.setup();
        const inputElement = screen.getByPlaceholderText('ポケモンのIDを入力');
        await user.type(inputElement, '25');
        const buttonElement = screen.getByRole('button', { name: 'ポケモンを見つける' });
        await userEvent.click(buttonElement);
        const pokemonName = screen.getByText('pikachu');
        expect(pokemonName).toBeInTheDocument();
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', pikachuImgEndpoint);
    });

    test('データが見つからない場合のエラーメッセージが表示されるか', async () => {
        render(<PokemonFinder />);
        const user = userEvent.setup();
        const inputElement = screen.getByPlaceholderText('ポケモンのIDを入力');
        await user.type(inputElement, '2000');
        const buttonElement = screen.getByRole('button', { name: 'ポケモンを見つける' });
        await userEvent.click(buttonElement);
        const errorMessage = screen.getByText('ポケモンのデータが見つかりません。');
        expect(errorMessage).toBeInTheDocument();
    });
});