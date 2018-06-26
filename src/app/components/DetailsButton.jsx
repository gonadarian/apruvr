/* @flow */
import React, { type Element } from 'react';
import { iif } from '../utils';

type Props = {|
    slug: string,
    historySlug: ?string,
    onHistory: (id: ?string) => void,
|};

const DetailsButton = ({ slug, historySlug, onHistory }: Props): Element<'span'> =>
    <span style={{ padding: '0 1em 0 1em', cursor: 'pointer' }}
        className={`fas fa-angle-double-${iif(historySlug === slug, 'up', 'down')}`}
        onClick={(): void => onHistory(iif(historySlug === slug, null, slug))} />;

export default DetailsButton;
