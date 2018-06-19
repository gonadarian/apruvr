import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../Button';

describe('Button component', () => {

    it('renders correctly by default', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.type).toEqual('div');
        expect(tree.props.className).toEqual(expect.stringContaining('default'));
    });

    it('renders correctly when inactive', () => {
        const tree = renderer.create(<Button isActive={false} />).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.props.className).toEqual(expect.stringContaining('default'));
    });

    it('renders correctly when active', () => {
        const tree = renderer.create(<Button isActive />).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.props.className).toEqual(expect.stringContaining('primary'));
    });

});
