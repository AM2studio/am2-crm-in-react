import React, { Component } from 'react';
import Loading from '../../components/General/Loading';
import Milestone from './Milestone';

class Milestones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loading === true) {
            const { projectMilestones } = this.props;
            this.setState({ milestones: projectMilestones, loading: false }); // eslint-disable-line
        }
    }

    actionType = (type, key) => {
        const { milestones } = this.state;
        if (type === 'delete') {
            delete milestones[key];
        } else {
            milestones[key].action = type;
        }
        this.setState({ milestones });
    };

    addMilestone = () => {
        const { milestones } = this.state;
        milestones.push({});
        this.setState({ milestones });
    };

    render() {
        const { handleModalClose } = this.props;

        const {
            milestones,
            loading
            // active_project,
            // project_features // eslint-disable-line camelcase
        } = this.state;
        const { project } = this.props;
        return (
            <div className="section">
                <header className="section__header">
                    <h2 className="section__title">Edit Milestones</h2>
                </header>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="section__content">
                        <form className="form">
                            {Object.keys(milestones).map(key => (
                                <div
                                    key={key}
                                    className={
                                        milestones[key].action
                                            ? `${milestones[key].action} columns is-multiline`
                                            : 'columns is-multiline'
                                    }
                                >
                                    <Milestone
                                        milestoneKey={key}
                                        milestones={milestones[key]}
                                        project={project}
                                        actionType={this.actionType}
                                    />
                                </div>
                            ))}
                            <div className="field">
                                <button type="button" className="button is-primary" onClick={this.addMilestone}>
                                    Add New
                                </button>
                                <button type="button" className="button is-danger right" onClick={handleModalClose}>
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

export default Milestones;
