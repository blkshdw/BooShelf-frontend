import React, { Component, PropTypes } from 'react';
import { Navbar, NavItem, Nav, Glyphicon } from 'react-bootstrap';
import cx from './NavigationTop.scss';

export default class NavigationTop extends Component {
    static propTypes = {
        user: PropTypes.object,
        toggleLeftPanel: PropTypes.func,
        pushState: PropTypes.func
    };

    state = {
        menuExpanded: false
    };

    render() {
        const { user, toggleLeftPanel, pushState } = this.props;
        const { menuExpanded } = this.state;

        return (
            <Navbar
                inverse
                fluid
                staticTop
                className={cx('navigation-top')}
                expanded={menuExpanded}
                onToggle={::this.onMenuExpanded}
            >
                <Nav componentClass={cx('nav-head')}>
                    <Navbar.Toggle onClick={toggleLeftPanel} className={cx('toggle-sidebar')}/>

                    <Navbar.Brand>
                        <a href="#">BooShelf</a>
                    </Navbar.Brand>

                    <Navbar.Toggle onClick={::this.toggleMenu} className={cx('expand-menu')}>
                        {menuExpanded
                            ? (<Glyphicon glyph="menu-up"/>)
                            : (<Glyphicon glyph="menu-down"/>)
                        }
                    </Navbar.Toggle>
                </Nav>
                <Navbar.Collapse>
                    <Nav pullRight onSelect={path => {path && pushState(null, path)}}>
                        <NavItem >{user.name}</NavItem>
                        <NavItem eventKey="/logout">Logout</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    toggleMenu() {
        this.setState({menuExpanded: !this.state.menuExpanded});
    }

    onMenuExpanded() {

    }
}
