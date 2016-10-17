import React, { PropTypes } from 'react';
import map from 'lodash/map';

const StatePicker = ({ states, current, pickable = false, onChoose }) => {
    const picker = !pickable ? null :
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
                                    {state ? state : '...'}
                                </span>
                        </button>
                    </li>
                )}
            </ul>
        </div>;

    return (
        <div className="btn-group" role="group">
            <button type="button" className="btn btn-info">
                <span className="badge">
                    {current ? current : '...'}
                </span>
            </button>
            {picker}
        </div>
    );
};

StatePicker.propTypes = {
    states:     PropTypes.arrayOf(PropTypes.string).isRequired,
    current:    PropTypes.string,
    pickable:   PropTypes.bool,
    onChoose:   PropTypes.func.isRequired,
};

export default StatePicker;
