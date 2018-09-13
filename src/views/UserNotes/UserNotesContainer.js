import React, { Component } from 'react';
import UserNotes from './UserNotes';
import WP_API from '../../data/Api';
import LoadingWidget from '../Dashboard/Widgets/LoadingWidget';

class UserNotesContainer extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        };
    }

    componentWillMount() {
        const api = new WP_API();
        api.getAllPosts('user-note').then(result => {
            const posts = result.map(post => ({
                id: post.id,
                note_from: post.author,
                note_for: post.note_for,
                note_type: post.note_type,
                content: post.content
            }));
            this.setState({ notes: posts });
        });
        console.log(this.state);
    }

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
        const { notes } = this.state;

        const filteredData = notes.map(user => {
            const filteredUser = user;
            filteredUser.note_type = this.noteType(user.note_type);
            return filteredUser;
        });
        const columns = [
            { key: 'note_from', title: 'From' },
            { key: 'note_for', title: 'For' },
            { key: 'note_type', title: 'Type' },
            { key: 'content', title: 'Content' }
            // { key: 'btn', title: 'Action' }
        ];
        return (
            <React.Fragment>
                {notes.length > 0 ? (
                    <UserNotes columns={columns} data={filteredData} addUser={this.addUser} />
                ) : (
                    <LoadingWidget className="section" title="User Notes" />
                )}
            </React.Fragment>
        );
    }
}

export default UserNotesContainer;
