import { isEmpty, last } from 'lodash';
import React, { Component, PropTypes } from 'react';
import config from 'config';
import WidgetTicketList from './WidgetTicketList';
import cx from './TicketsList.styl';

export default class TicketsList extends Component {
    static propTypes = {
        user: PropTypes.object
    }

    render() {
        const { user } = this.props;

        return (
            <div className={cx('usercard-header')}>
                <div class="container target">
                    <div class="row">
                        <div class="col-sm-10">
                            <h1 class="">Starfox221</h1>

                            <button type="button" class="btn btn-success">Book me!</button>  <button type="button" class="btn btn-info">Send me a message</button>
                            <br />
                        </div>
                        <div class="col-sm-2"><a href="/users" class="pull-right"><img title="profile image" class="img-circle img-responsive" src="http://www.rlsandbox.com/img/profile.jpg"></a>

                        </div>
                    </div>
            </div>
        );
    }