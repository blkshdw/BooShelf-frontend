import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { toggleLeftPanel } from 'actions';
import { mainSelector } from 'selectors';
import { bindActionCreators } from 'redux';
import NavigationTop from 'components/NavigationTop';
import SidebarBox from 'components/SidebarBox';
import ContentBox from 'components/ContentBox';
import cx from './Main.styl';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleLeftPanel,
        pushState
    }, dispatch);
}

@connect(mainSelector, mapDispatchToProps)
export default class Main extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        content: PropTypes.element.isRequired,
        isExpandedLeftPanel: PropTypes.bool,
        toggleLeftPanel: PropTypes.func,
        pushState: PropTypes.func
    }

    render() {
        const { user, content, toggleLeftPanel, isExpandedLeftPanel, pushState } = this.props;

        return (
            <section className={cx('layout')}>
                <NavigationTop
                    user={user}
                    toggleLeftPanel={toggleLeftPanel}
                    pushState={pushState}
                />
                <section className={cx('layout-main')}>
                    <SidebarBox
                        user={user}
                        isExpandedLeftPanel={isExpandedLeftPanel}
                    />
                    <ContentBox>
                        {content}
                    </ContentBox>
                </section>
            </section>
        );
    }
}
