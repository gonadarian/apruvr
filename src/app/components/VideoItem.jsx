import React from 'react';

const VideoItem = ({ content }) => {
    const { slug, title, subbed, dubbed } = content;

    const className = dubbed
        ? 'success'
        : subbed
            ? 'info'
            : 'danger';

    return (
        <tr className={className}>
            <td>
                <a
                    className="btn btn-link"
                    href={`https://www.khanacademy.org/v/${slug}`}
                    target="_blank">
                        {title}
                </a>
            </td>

            <td>
                <a
                    className="btn btn-default"
                    href={`https://translate.khanacademy.org/v/${slug}`}
                    target="_blank">
                        sub
                        {' '}
                        <span className="badge">
                            {subbed ? 'yes' : 'no'}
                        </span>
                </a>
            </td>

            <td>
                <a
                    className="btn btn-default"
                    href={`v/${slug}`}
                    target="_blank">
                        dub
                        {' '}
                        <span className="badge">
                            {dubbed ? 'yes' : 'no'}
                        </span>
                </a>
            </td>
        </tr>
    );
};

VideoItem.propTypes = {
    content:    React.PropTypes.shape({
        slug:       React.PropTypes.string.isRequired,
        title:      React.PropTypes.string.isRequired,
        subbed:     React.PropTypes.bool.isRequired,
        dubbed:     React.PropTypes.bool.isRequired,
    }).isRequired,
};

export default VideoItem;
