/* @flow */
import React, { type Element } from 'react';
import { iif } from '../utils';

type PropsType = {
    slug: string,
    historySlug: ?string,
    onHistory: (id: ?string) => void,
};

const DetailsButton = ({ slug, historySlug, onHistory }: PropsType): Element<'span'> =>
    <span
        className={`fas fa-angle-double-${iif(historySlug === slug, 'up', 'down')}`}
        onClick={(): void => onHistory(iif(historySlug === slug, null, slug))} />;

export default DetailsButton;
