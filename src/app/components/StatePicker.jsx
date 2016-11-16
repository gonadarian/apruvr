import React, { PropTypes } from 'react';
import map from 'lodash/map';

const getName = (state, nameMap) =>
    nameMap && state in nameMap ? nameMap[state] : state;

const StatePicker = ({ states, current, pickable = false, nameMap, onChoose }) =>
    <div className="btn-group" role="group">
        <button type="button" className="btn btn-info">
            <span className="badge">
                {current ? getName(current, nameMap) : '...'}
            </span>
        </button>
        {pickable &&
            <div className="btn-group" role="group">
                <button
                    type="button"
                    className="btn btn-default dropdown-toggle"
                    data-toggle="dropdown">
                        <span className="caret" />
                </button>
                <ul className="dropdown-menu">
                    {map(states, (state) =>
                        <li key={state}>
                            <button
                                type="button"
                                className={current && state === current
                                    ? 'btn btn-info'
                                    : 'btn btn-default'}
                                style={{ width: '100%' }}
                                onClick={() => onChoose(state)}>
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

StatePicker.propTypes = {
    states:     PropTypes.arrayOf(PropTypes.string).isRequired,
    current:    PropTypes.string,
    pickable:   PropTypes.bool,
    nameMap:    PropTypes.object,
    onChoose:   PropTypes.func.isRequired,
};

export default StatePicker;
