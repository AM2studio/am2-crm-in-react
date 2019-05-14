import React, { Component } from 'react';
import Notes from './Notes';
import WP_API from '../../data/Api';

class NotesContainer extends Component {
    constructor() {
        super();
        this.state = {
            notes: [],
            usersList: [],
            offset: 0,
            totalRecords: 0,
            loading: true,
            filterUser: ''
        };
    }

    componentWillMount() {
        this.getNotes();
    }

    filterChangeEvent = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value, loading: true }, () => {
            this.getNotes(true);
        });
    };

    getNotes = (update = false) => {
        const { offset, filterUser } = this.state;
        const { itemsPerPage } = this.props;
        let byPassCache = update;
        let byPassCacheSave = true;
        if (filterUser) {
            byPassCache = true;
            byPassCacheSave = false;
        }
        const api = new WP_API();
        const usersList = api.getPosts('users').then(result => result.data);
        let notesCount = 0;
        const notes = api
            .getPosts('user-note', { itemsPerPage, offset, filterUser }, byPassCache, byPassCacheSave)
            .then(result => {
                notesCount = result.count.publish;
                console.log(result);
                return result.data.map(post => ({
                    id: post.id,
                    date: post.date,
                    note_from: post.author,
                    note_for: post.note_for,
                    note_type: post.note_type,
                    content: post.content
                }));
            });
        Promise.all([usersList, notes]).then(result => {
            this.setState({
                notes: result[1],
                totalRecords: notesCount,
                usersList: result[0],
                loading: false
            });
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
        const { notes, totalRecords, loading, usersList } = this.state;
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
                <Notes
                    columns={columns}
                    data={filteredData}
                    addUser={this.addUser}
                    onPageChanged={this.onPageChanged}
                    totalRecords={totalRecords}
                    loading={loading}
                    itemsPerPage={itemsPerPage}
                    usersList={usersList}
                    filterChangeEvent={this.filterChangeEvent}
                />
            </React.Fragment>
        );
    }
}

export default NotesContainer;

NotesContainer.defaultProps = {
    itemsPerPage: 20
};
