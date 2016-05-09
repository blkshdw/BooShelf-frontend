import React, { Component, PropTypes } from 'react';
import { Line } from 'react-chartjs';
import cx from './PlotList.styl';

const chartOptions = {
    bezierCurve : false,
    datasetFill : false,
    pointDotStrokeWidth: 4,
    scaleShowVerticalLines: false,
    responsive: true
};

const styles = {
    "graphContainer" : {
        "height" : "600px",
        "width" : "1000px",
        "marginBottom" : "30px",
        "padding" : "20px"
    }
};

export default class PlotList extends Component {
    static propTypes = {
        stats: PropTypes.object,
        labels: PropTypes.array
    }

    render() {
        const { stats, labels } = this.props;
        const { resolved, resTime, reacTime } = stats;
        return (
            <div className={cx('plot-list')} ref="plotList">
                <div className="panel panel-primary" >
                    <div className="panel-heading">{resolved.label}</div>
                    <div className={cx('panel-body', 'plot')} >
                        {resolved.data && resolved.data.length ? <div style={styles.graphContainer}> <Line className={cx('box-col', 'chart')} options={chartOptions} redraw data={{labels: labels, datasets: [resolved]}} width="1000" height="600"/> </div> :
                            'Sorry, there is nothing to show'
                        }
                    </div>
                </div>
                <div className="panel panel-primary">
                    <div className="panel-heading">{resTime.label}</div>
                    <div className={cx('panel-body', 'plot')} >
                        {resTime.data && resTime.data.length ?<div style={styles.graphContainer}> <Line className={cx('box-col', 'chart')} options={chartOptions} redraw data={{labels: labels, datasets: [resTime]}} width="1000" height="600"/> </div> :
                            'Sorry, there is nothing to show'
                        }
                    </div>
                </div>
                <div className="panel panel-primary">
                    <div className="panel-heading">{reacTime.label}</div>
                    <div className={cx('panel-body', 'plot')}>
                        {reacTime.data && reacTime.data.length ? <div style={styles.graphContainer}> <Line className={cx('box-col', 'chart')} options={chartOptions} redraw data={{labels: labels, datasets: [reacTime]}} width="1000" height="600"/> </div>:
                            'Sorry, there is nothing to show'
                        }
                    </div>
                </div>
            </div>
        );
    }
}
