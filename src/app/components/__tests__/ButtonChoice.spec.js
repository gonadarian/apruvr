import React from 'react';
import renderer from 'react-test-renderer';
import { ButtonChoice } from '../ButtonChoice';

describe('ButtonChoice component', () => {
    /* eslint-disable no-magic-numbers */

    it('renders correctly by default', () => {
        const tree = renderer.create(
            <ButtonChoice />
        ).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.type).toEqual('div');
        expect(tree.props.children).toBeUndefined();
    });

    it('renders correctly with single choice', () => {
        const tree = renderer.create(
            <ButtonChoice
                choices={{ 'work': true }}
                used={['work']}
                names={{ 'work': 'Work' }} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.children).toHaveLength(1);
        expect(tree.children[0].props.className).toEqual(expect.stringContaining('primary'));
        expect(tree.children[0].children).toContain('Work');
    });

    it('renders correctly with multiple choices', () => {
        const tree = renderer.create(
            <ButtonChoice
                choices={{ 'work': false, 'sleep': true }}
                used={['work', 'sleep']}
                names={{ 'work': 'Work', 'sleep': 'Sleep' }} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.children).toHaveLength(2);
        expect(tree.children[0].props.className).toEqual(expect.stringContaining('default'));
        expect(tree.children[1].props.className).toEqual(expect.stringContaining('primary'));
        expect(tree.children[1].children).toContain('Sleep');
    });

});
