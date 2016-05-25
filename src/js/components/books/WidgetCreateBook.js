import React, {Component, PropTypes} from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {genres } from 'constants/Common';
import cx from './WidgetCreateBook.styl';
import {Modal, FormControl, FormGroup, ControlLabel, Form, Button, Col} from 'react-bootstrap';

export default class WidgetUserDialog extends Component {
    static propTypes = {
        createUser: PropTypes.func,
        toggleCreateUserDialog: PropTypes.func,
        active: PropTypes.bool
    };

    state = {
        title: '',
        author: '',
        genre: genres[0],
        description: '',
        writtenOn: null
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.active && !nextProps.isCreating && !nextProps.error) {
            return this.props.toggleCreateBookDialog();
        }
    }

    render() {
        const {active, toggleCreateBookDialog, isCreating, error, createUser} = this.props;

        const dateProps = this.state.writtenOn ? {
            dateTime: this.state.writtenOn
        } : {
            defaultText: "Date"
        }

        return (
            <Modal show={active} onHide={toggleCreateBookDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Add book</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Title
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleChangeProp('title')}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Author
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Author"
                                    value={this.state.author}
                                    onChange={this.handleChangeProp('author')}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalRole">
                            <Col componentClass={ControlLabel} sm={2}>
                                Genre
                            </Col>

                            <Col sm={10}>
                                <FormControl
                                    componentClass="select"
                                    placeholder="role"
                                    value={this.state.role}
                                    onChange={this.handleChangeProp('genre')}
                                >
                                    {genres.map((genre, idx) => (
                                        <option value={genre} key={idx}>
                                            {genre}
                                        </option>
                                    ))}
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Overview
                            </Col>
                            <Col sm={10}>
                                <textarea
                                    type="text"
                                    className={cx('my-textarea')}
                                    placeholder="Overview"
                                    value={this.state.description}
                                    onChange={this.handleChangeProp('description')}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Written on
                            </Col>
                            <Col sm={10}>
                                <DateTimeField {...dateProps} onChange={date => this.setState({writtenOn: date})} viewMode="years" mode="date" />
                            </Col>
                        </FormGroup>

                    </Form>
                </Modal.Body>
                {error && <div style={{"color": "red", "marginLeft": "160px"}}>Error: {error}</div> }

                <Modal.Footer>
                    <Button onClick={toggleCreateBookDialog} disabled={isCreating}>Cancel</Button>
                    <Button bsStyle="primary" onClick={::this.handleCreateBook} disabled={isCreating}>Create book</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    handleChangeProp(key) {
        return (event) => {
            this.setState(
                Object.assign(this.state, {
                    [key]: event.target.value
                })
            );
        }
    }

    handleCreateBook() {
        const query = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            genre: this.state.genre

        }
        if(this.state.writtenOn !== "Invalid date" && this.state.writtenOn) {
            query.writtenOn = this.state.writtenOn;
        } else {
            this.setState({
                writtenOn: this.props.writtenOn
            })
        }
        this.props.createBook(query);
    }

}