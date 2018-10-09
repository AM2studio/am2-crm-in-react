import React, { Component } from 'react';
import Notes from './Notes';
import WP_API from '../../data/Api';
import LoadingWidget from '../Dashboard/Widgets/LoadingWidget';

class NotesContainer extends Component {
    constructor() {
        super();
        this.state = {
            notes: [],
            offset: 0,
            totalRecords: 0,
            loading: true
        };
    }

    componentWillMount() {
        this.getNotes();
    }

    getNotes = () => {
        const { offset } = this.state;
        const { itemsPerPage } = this.props;
        const api = new WP_API();
        api.getPosts('user-note', { itemsPerPage, offset }).then(result => {
            const posts = result.data.map(post => ({
                id: post.id,
                date: post.date,
                note_from: post.author,
                note_for: post.note_for,
                note_type: post.note_type,
                content: post.content
            }));
            this.setState({ notes: posts, totalRecords: result.count.publish, loading: false });
        });
    };

    onPageChanged = page => {
        const { itemsPerPage } = this.props;
        const offset = (page - 1) * itemsPerPage;
        this.setState({ offset, loading: true }, () => {
            this.getNotes();
        });
    };

    deleteNote = (e, id) => {
        console.log(`Deleting note with id: ${id}`);
    };

    noteType = noteType => {
        switch (noteType) {
            case '0':
                return <span className="note-type-positive">Positive</span>;
            case '1':
                return <span className="note-type-negative">Negative</span>;
            case '2':
                return <span className="note-type-neutral">Neutral</span>;
            default:
                return <span className="note-type-neutral">Missing</span>;
        }
    };

    render() {
        const { notes, totalRecords, loading } = this.state;
        const { itemsPerPage } = this.props;
        const filteredData = notes.map(user => {
            const filteredUser = user;
            filteredUser.note_type = this.noteType(user.note_type);
            return filteredUser;
        });
        const columns = [
            { key: 'date', title: 'Date' },
            { key: 'note_from', title: 'From' },
            { key: 'note_for', title: 'For' },
            { key: 'note_type', title: 'Type' },
            { key: 'content', title: 'Content' }
            // { key: 'btn', title: 'Action' }
        ];
        return (
            <React.Fragment>
                {notes.length > 0 ? (
                    <Notes
                        columns={columns}
                        data={filteredData}
                        addUser={this.addUser}
                        onPageChanged={this.onPageChanged}
                        totalRecords={totalRecords}
                        loading={loading}
                        itemsPerPage={itemsPerPage}
                    />
                ) : (
                    <LoadingWidget className="section" title="User Notes" />
                )}
            </React.Fragment>
        );
    }
}

export default NotesContainer;

NotesContainer.defaultProps = {
    itemsPerPage: 20
};
