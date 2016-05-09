import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StatisticsSelector } from 'selectors';
import Loader from 'components/Loader';
import { PlotList, StatisticsHeader } from 'components/statistics';
import {
    fetchUserStatistics,
    fetchOrganizationStatistics,
    fetchUsers,
    filterByUser,
    filterPeriodFrom,
    filterPeriodTo,
    filterRange
} from 'actions';
import cx from './StatisticsContent.styl';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserStatistics,
        fetchOrganizationStatistics,
        fetchUsers,
        filterByUser,
        filterRange,
        filterPeriodFrom,
        filterPeriodTo
    }, dispatch);
}

@connect(StatisticsSelector, mapDispatchToProps)
export default class ChannelsContent extends Component {
    static propTypes = {
        labels: PropTypes.array,
        stats: PropTypes.object,
        fetchStatistics: PropTypes.func,
        periodFrom: PropTypes.object,
        periodTo: PropTypes.object,
        timeRange: PropTypes.string,
        userId: PropTypes.string,
        users: PropTypes.array,
        user: PropTypes.object,
        isFetching: PropTypes.bool,
        needFetching: PropTypes.bool,
        filterByUser: PropTypes.func,
        filterPeriodFrom: PropTypes.func,
        filterPerionTo: PropTypes.func,
        filterRange: PropTypes.func
    }

    componentWillMount() {
        this.props.fetchUsers();
        if (this.props.userId) {
            this.props.fetchUserStatistics(this.props.userId, this.props.timeRange);
        } else {
            this.props.fetchOrganizationStatistics(this.props.timeRange);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.needFetching) {
            const periodFrom = nextProps.periodFrom ? nextProps.periodFrom : '';
            const periodTo = nextProps.periodTo ? nextProps.periodTo : '';
            if (nextProps.userId) {
                this.props.fetchUserStatistics(nextProps.userId, nextProps.timeRange, periodFrom, periodTo);
            } else {
                this.props.fetchOrganizationStatistics(nextProps.timeRange, periodFrom, periodTo);
            }
        }

    }

    render() {
        const { stats, labels, userId, user, users, filterByUser, isFetching, needFetching, ...rest } = this.props;
        if ((!users || !stats) && (isFetching || needFetching)) {
            return <Loader />;
        }
        return (
            <section className={cx('statistics-content')}>
                <StatisticsHeader userId={userId} users={users} user={user} {...rest} filterByUser={filterByUser} />
                <PlotList className={cx('plot-list')} stats={stats} labels={labels}/>
            </section>
        );
    }
}
