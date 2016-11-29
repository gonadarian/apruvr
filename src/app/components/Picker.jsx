/* @flow */
import React from 'react';
import type { Element } from 'react';
import { map } from 'lodash';

const getName = (state: string, nameMap?: {[id: string]: string}): string =>
    nameMap && state in nameMap ? nameMap[state] : state;

type PropsType = {
    states: Array<?string>,
    current: ?string,
    pickable: boolean,
    nameMap?: {[id: string]: string},
    onChoose: (state: ?string) => void,
};

const Picker = ({ states, current, pickable, nameMap, onChoose }: PropsType): Element<*> =>
    <div className="btn-group" role="group">
        <button type="button" className="btn btn-primary">
            <span className="badge">
                {current ? getName(current, nameMap) : '...'}
            </span>
        </button>
        {pickable &&
            <div className="btn-group" role="group">
                <button type="button"
                    className="btn btn-default dropdown-toggle"
                    data-toggle="dropdown">
                        <span className="caret" />
                </button>
                <ul className="dropdown-menu">
                    {map(
                        states,
                        (state: ?string): Element<*> =>
                            <li key={state}>
                                <button type="button"
                                    className={current && state === current
                                        ? 'btn btn-primary'
                                        : 'btn btn-default'}
                                    style={{ width: '100%' }}
                                    onClick={(): void => onChoose(state)}>
                                        <span className="badge">
                                            {state ? getName(state, nameMap) : '...'}
                                        </span>
                                </button>
                            </li>
                    )}
                </ul>
            </div>
        }
    </div>;

export default Picker;
