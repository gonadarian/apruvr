import React from 'react';
import axios from 'axios';

import Spinner from 'react-spinkit';

import ContentListComponent from '../components/ContentListComponent.jsx';
import ButtonChoiceComponent from '../components/ButtonChoiceComponent.jsx';
import ButtonGroupComponent from '../components/ButtonGroupComponent.jsx';
import TopicListComponent from '../components/TopicListComponent.jsx';
import Consts from '../helpers/Consts.jsx';

import map from 'lodash/map';
import size from 'lodash/size';
import forIn from 'lodash/forIn';
import filter from 'lodash/filter';
import reduce from 'lodash/reduce';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import transform from 'lodash/transform';
import mapValues from 'lodash/mapValues';

const { CONTENTS, LANGUAGES, VISIBILITIES, PICKS, NAMES } = Consts;

class LanguagePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading:    false,
            topic:      'root.math',
            content:    CONTENTS[0],
            language:   null,
            nodes:      null,
            visibility: {
                fresh:      true,
                doing:      true,
                translated: true,
                approved:   true,
                subtitled:  true,
                dubbed:     true,
            },
        };
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    handleVisibilityChange(changedKey) {
        const newState = mapValues(
            this.state.visibility,
            (state, key) => key === changedKey ? !state : state
        );

        this.setState({
            visibility: newState,
        });
    }

    handleContentChange(newContent) {
        this.setState({
            content: newContent,
        });
    }

    handleTopicChange(newTopic) {
        this.setState({
            topic: newTopic,
        });
    }

    handleLanguageChange(newLang) {
        this.setState({
            loading:    true,
            language:   newLang,
            nodes:      null,
        });

        const url = `https://www.khanacademy.org/api/internal/translate_now?lang=${newLang.code}`;
        this.serverRequest = axios
            .get(url)
            .then((result) => this.handleLanguageResult(result));
    }

    handleLanguageResult(result) {
        const newTree = {};
        forEach(
            result.data.nodes.topics,
            (topic) => this.handleTopic(newTree, topic)
        );

        this.setState({
            loading:    false,
            nodes:      result.data.nodes,
            tree:       newTree,
        });
    }

    handleTopicList(topicList, topic) {
        if (size(topicList) === 0) {
            return false;
        }

        if (topic.slug in topicList) {
            topicList[topic.slug] = topic;
            return true;
        }

        let success = false;
        forEach(
            filter(
                topicList,
                (item) => !isEmpty(item)),
            (item) => {
                if (this.handleTopicList(item.topics, topic)) {
                    success = true;
                    return false;
                }
                return true;
            });

        return success;
    }

    handleTopic(tree, item) {
        item.topics = {};

        forEach(
            filter(
                item.children,
                (child) => child[0] === 'Topic'),
            (topic) => {item.topics[topic[1]] = {};});

        item.children = filter(
            item.children,
            (child) => child[0] !== 'Topic');

        forIn(
            item.topics,
            (value, slug) => {
                if (slug in tree) {
                    item.topics[slug] = tree[slug];
                    delete tree[slug];
                }
            });

        const found = this.handleTopicList(tree, item);
        if (!found) {
            tree[item.slug] = item;
        }
    }

    getFilteredNodes() {
        if (this.state.nodes === null) {
            return null;
        }

        const startPath = this.state.topic.split('.').slice(1);
        const topic = reduce(
            startPath,
            (currTopic, slug) => currTopic.topics[slug],
            this.state.tree.root);

        const slugs = { exercises: {}, articles: {}, videos: {}, scratchpads: {} };
        this.loadSlugs(topic, slugs, startPath);

        const nodes = this.state.nodes[this.state.content.code];
        const filtered = transform(
            slugs[this.state.content.code],
            (result, path, slug) => {result[slug] = { ...nodes[slug], path };},
            {});

        return filtered;
    }

    loadSlugs(topic, slugs, path) {
        forEach(
            topic.children,
            (child) => {slugs[NAMES[child[0]]][child[1]] = path;});

        forIn(
            topic.topics,
            (current) => this.loadSlugs(current, slugs, [...path, current.slug]));
    }

    export(code, nodes) {
        const data = reduce(
            map(
                nodes,
                (content, key) =>
                    code === 'videos'
                        ? this.exportVideo(key, content)
                        : this.exportCrowdin(key, content)
            ),
            (result, row) => result + '\n' + row,
            code === 'videos'
                ? 'slug\ttitle\tsubbed\tdubbed\tsubject\ttopic\tsubtopic\ttutorial'
                : 'slug\ttitle\ttotal\ttranslated\tapproved\tsubject\ttopic\tsubtopic\ttutorial');

        return 'data:attachment/csv,' + encodeURIComponent(data);
    }

    exportCrowdin(key, content) {
        const data =
              key + '\t' +
              content.title + '\t' +
              content.wordCount + '\t' +
              content.translatedWordCount + '\t' +
              content.approvedWordCount + '\t' +
              content.path.join('\t');

        return data;
    }

    exportVideo(key, content) {
        const data =
              key + '\t' +
              content.title + '\t' +
              content.subbed + '\t' +
              content.dubbed + '\t' +
              content.path.join('\t');

        return data;
    }

    render() {
        const nodes = this.getFilteredNodes();

        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Khan Academy Apruvr</h1>
                    <p>Approval workflow for Khan Academy translations.</p>
                </div>

                <div className="container-fluid">

                    <div className="col-md-12">
                        <h2>Languages</h2>
                        <ButtonGroupComponent
                            buttons={LANGUAGES}
                            current={this.state.language}
                            onChoose={this.handleLanguageChange.bind(this)} />
                    </div>

                    {this.state.loading &&
                        <div className="col-md-12">
                            <h2>Loading</h2>
                            <Spinner spinnerName="three-bounce" />
                        </div>
                    }

                    {nodes !== null && <div>

                        <div className="col-md-4">
                            <h2>Content</h2>
                            <ButtonGroupComponent
                                buttons={CONTENTS}
                                current={this.state.content}
                                onChoose={this.handleContentChange.bind(this)} />
                        </div>

                        <div className="col-md-4">
                            <h2>States</h2>
                            <ButtonChoiceComponent
                                choices={this.state.visibility}
                                used={PICKS[this.state.content.code]}
                                names={VISIBILITIES}
                                onChoose={this.handleVisibilityChange.bind(this)} />
                        </div>

                        <div className="col-md-4">
                            <h2>Export</h2>
                            <a className="btn btn-primary"
                                href={this.export(this.state.content.code, nodes)}
                                download={this.state.content.name + ' ' + this.state.topic + '.csv'}
                                target="_blank">
                                    Generate CSV
                            </a>
                        </div>

                        <div className="col-md-4">
                            <h2>Topics</h2>
                            <TopicListComponent
                                root={this.state.tree.root}
                                selected={this.state.topic}
                                onChoose={this.handleTopicChange.bind(this)}/>
                        </div>

                        <div className="col-md-8">
                            <h2>
                                {this.state.content.name}&nbsp;
                                <span className="badge">
                                    {size(nodes)}
                                </span>
                            </h2>
                            <ContentListComponent
                                contents={nodes}
                                language={this.state.language}
                                type={this.state.content.code}
                                title={this.state.content.name}
                                visibility={this.state.visibility} />
                        </div>

                    </div>}

                </div>
            </div>
        );
    }

}

export default LanguagePage;
