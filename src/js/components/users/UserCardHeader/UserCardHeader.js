import { isEmpty, last } from 'lodash';
import React, { Component, PropTypes } from 'react';
import cx from './userCardHeader.styl';

export default class UserCardHeader extends Component {
    static propTypes = {
        user: PropTypes.object
    }

    render() {
        const {user} = this.props;

        return (
            <div className={cx('usercard-header', 'container target')}>
                <div className="row">
                    <div className="col-sm-10">
                        <h1 className="">Starfox221</h1>

                        <button type="button" className="btn btn-success">Book me!</button>
                        <button type="button" className="btn btn-info">Send me a message</button>
                        <br />
                    </div>
                    <div className="col-sm-2"><a href="/users" className="pull-right"></a>
                    </div>
                </div>
            </div>
        );
    }
}