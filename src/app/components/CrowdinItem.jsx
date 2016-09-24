import React from 'react';
import { sprintf } from 'sprintf-js';

import Apruvr from '../helpers/apruvr';

const CrowdinItem = ({ content, language, code }) => {
    const { slug, title, wordCount, translatedWordCount, approvedWordCount } = content;

    const trnsp = wordCount === 0 ? 0 : translatedWordCount / wordCount * 100;
    const apprp = wordCount === 0 ? 0 : approvedWordCount / wordCount * 100;

    const className = apprp === 100
        ? 'success'
        : trnsp === 100
            ? 'info'
            : trnsp > 0
                ? 'warning'
                : 'danger';

    return (
        <tr className={className}>
            <td>
                <a
                    className="btn btn-link"
                    href={`https://www.khanacademy.org/${code}/${slug}`}
                    target="_blank">
                        {title}
                        {' '}
                        <span className="badge">
                            {wordCount}
                        </span>
                </a>
            </td>

            <td>
                <a
                    className="btn btn-default"
                    href={`https://translate.khanacademy.org/${code}/${slug}`}
                    target="_blank">
                        go
                        {' '}
                        <span className="badge">
                            {translatedWordCount} ({sprintf('%.0f', trnsp)}%)
                        </span>
                </a>
            </td>

            <td>
                <a
                    className="btn btn-default"
                    href={`https://crowdin.com/proofread/khanacademy/all/enus-${language.code}#q=/${slug}`}
                    target="_blank">
                        go
                        {' '}
                        <span className="badge">
                            {approvedWordCount} ({sprintf('%.0f', apprp)}%)
                        </span>
                </a>
            </td>
        </tr>
    );
};

CrowdinItem.propTypes = {
    code:       React.PropTypes.string.isRequired,
    language:   Apruvr.PropTypes.item.isRequired,
    content:    React.PropTypes.shape({
        slug:                   React.PropTypes.string.isRequired,
        title:                  React.PropTypes.string.isRequired,
        wordCount:              React.PropTypes.number.isRequired,
        translatedWordCount:    React.PropTypes.number.isRequired,
        approvedWordCount:      React.PropTypes.number.isRequired,
    }).isRequired,
};

export default CrowdinItem;
