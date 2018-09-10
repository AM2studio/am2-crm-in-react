import React, { Component } from 'react';
import AddTime from './Widgets/AddTime';
// import WP_AUTH from '../data/Auth';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <AddTime />
                <div className="section col-14">
                    <div className="section__content">
                        <div className="widget">
                            <span className="widget__title">Todays online sales</span>
                            <span className="widget__value">559</span>
                            <span className="widget__status color-primary">9%</span>
                            <span className="widget__status">
                                <strong>123</strong> last hour
                            </span>
                            <div className="widget__chart c3-mini" id="chart1" />
                            <script defer="defer" />
                        </div>
                    </div>
                </div>
                <div className="section col-14">
                    <div className="section__content">
                        <div className="widget">
                            <span className="widget__title">Todays online sales</span>
                            <span className="widget__value">559</span>
                            <span className="widget__status color-primary">9%</span>
                            <span className="widget__status">
                                <strong>123</strong> last hour
                            </span>
                            <div className="widget__chart c3-mini" id="chart1" />
                            <script defer="defer" />
                        </div>
                    </div>
                </div>
                <div className="section col-14">
                    <div className="section__content">
                        <div className="widget">
                            <span className="widget__title">Todays online sales</span>
                            <span className="widget__value">559</span>
                            <span className="widget__status color-primary">9%</span>
                            <span className="widget__status">
                                <strong>123</strong> last hour
                            </span>
                            <div className="widget__chart c3-mini" id="chart1" />
                            <script defer="defer" />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Dashboard;
