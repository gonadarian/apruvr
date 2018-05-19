/* @flow */
import React, { type ComponentType, Component } from 'react';
import { fetchNodes } from '../actions';
import { languageLookup } from '../consts';
import type { Store } from '../flows';

type Props = {
    params: {lang: string},
}

const languagePage = (store: Store, WrappedComponent: ComponentType<Props>) =>
    class HOC extends Component<Props> {
        static fetching (lang: string) {
            const language = languageLookup(lang);
            if (!language) {
                throw Error('Language should be available for this component.');
            }
            // load language translation data
            store.dispatch(fetchNodes(language));
        }

        componentDidMount () {
            HOC.fetching(this.props.params.lang);
        }

        componentDidUpdate (prevProps: Props) {
            if (this.props.params.lang === prevProps.params.lang) {
                return;
            }
            HOC.fetching(this.props.params.lang);
        }

        render () {
            return <WrappedComponent {...this.props} />;
        }
    };

export default languagePage;
