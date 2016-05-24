import React, {Component, PropTypes} from 'react';
import {Modal, FormControl, FormGroup, ControlLabel, Form, Button, Col} from 'react-bootstrap';
import StarRating from 'react-star-rating';
import cx from './WidgetReviewCreate.styl';

export default class WidgetUserEdit extends Component {
    static propTypes = {
        updateReview: PropTypes.func,
        toggleCreateReviewDialog: PropTypes.func,
        active: PropTypes.bool,
        isUpdating: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            rating: 0,
            book: props.book.id
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active && !nextProps.isCreating && !nextProps.error) {
            return this.props.closeDialogs();
        }
    }

    render() {
        const {active, closeDialogs, isUpdating, book, error} = this.props;

        return (
            <Modal show={active} onHide={closeDialogs} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.book.title} review</Modal.Title>
                </Modal.Header>
                {error && <div style={{"color": "red", "marginLeft": "160px", "marginTop": "5px"}}>Error: {error}</div> }
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalTitle">
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

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Rating
                            </Col>
                            <Col sm={10}>
                                <div style={{"width": "250px"}}>
                                    <StarRating
                                        name="rating"
                                        rating={this.state.rating}
                                        editing
                                        onRatingClick={(event, rating) => {this.setState({rating: rating.rating})}}
                                    />
                                </div>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalTextArea">
                            <Col componentClass={ControlLabel} sm={2}>
                                Content
                            </Col>
                            <Col sm={10}>
                                <textarea
                                    componentClass="textarea"
                                    className={cx('my-textarea')}
                                    placeholder="Content"
                                    value={this.state.content}
                                    onChange={this.handleChangeProp('content')}
                                />
                            </Col>
                        </FormGroup>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button disabled={isUpdating} onClick={closeDialogs}>Cancel</Button>
                    <Button disabled={isUpdating} bsStyle="primary" onClick={::this.handleCreateReview}>Update review</Button>
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

    handleCreateReview() {
        this.props.createReview(this.state);
    }
}