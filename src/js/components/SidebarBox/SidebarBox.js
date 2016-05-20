import React, {Component, PropTypes} from 'react';
import ButtonPrimary from './../ButtonPrimary';
import { Glyphicon, Button } from 'react-bootstrap';
import cx from './SidebarBox.styl';

export default class SidebarBox extends Component {
    static propTypes = {
        user: PropTypes.object,
        className: PropTypes.string,
        toggleLeftPanel: PropTypes.func,
        isExpandedLeftPanel: PropTypes.bool
    }

    static defaultProps = {
        className: '',
        
    };

    render() {
        const {user, className, isExpandedLeftPanel } = this.props;
        const isExpandedClassName = cx({'active': isExpandedLeftPanel});
        const sSectionClasses = cx('sidebar-box', className, isExpandedClassName);
        return (
            <aside className={sSectionClasses}>
                <nav className={cx('box-col nowrap scrollable', 'content')}>
                    <ButtonPrimary
                        to="/me"
                        className={cx('no-decoration vertical-align', 'nav-but')}>
                        <Glyphicon className={cx('icon')} glyph="heart"/>
                        My Shelf
                    </ButtonPrimary>
                    <ButtonPrimary
                        to="/users"
                        className={cx('no-decoration vertical-align', 'nav-but')}>
                        <Glyphicon className={cx('icon')} glyph="user"/>
                            Users
                    </ButtonPrimary>
                    <ButtonPrimary
                        to="/books"
                            className={cx('no-decoration vertical-align', 'nav-but')}>
                            <Glyphicon className={cx('icon')} glyph="book"/>
                            Books
                    </ButtonPrimary>
                    </nav>
            </aside>
        );
    }
}
