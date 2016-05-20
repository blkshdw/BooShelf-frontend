import React, {Component, PropTypes} from 'react';
import {Modal, FormControl, FormGroup, ControlLabel, Form, Button, Col} from 'react-bootstrap';
import StarRating from 'react-star-rating';
import cx from './WidgetReviewEdit.styl';

export default class WidgetUserEdit extends Component {
    static propTypes = {
        updateReview: PropTypes.func,
        toggleEditReviewDialog: PropTypes.func,
        active: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            content: props.content,
            rating: props.rating
        }
    }

    render() {
        const {active, closeDialogs} = this.props;

        return (
            <Modal show={active} onHide={closeDialogs} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.bookTitle}</Modal.Title>
                </Modal.Header>
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
                                <StarRating
                                    name="rating"
                                    rating={this.state.rating}
                                    editing
                                    onRatingClick={(event, rating) => {this.setState({rating: rating.rating})}}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalTextArea">
                            <Col componentClass={ControlLabel} sm={2}>
                                Content
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    componentClass="textarea"
                                    className={cx('textarea')}
                                    placeholder="Content"
                                    bsSize="large"
                                    value={this.state.content}
                                    onChange={this.handleChangeProp('content')}
                                />
                            </Col>
                        </FormGroup>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={closeDialogs}>Cancel</Button>
                    <Button bsStyle="primary" onClick={::this.handleUpdateReview}>Update review</Button>
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

    handleUpdateReview() {
        this.props.updateReview(this.state);
        return this.props.closeDialogs();
    }

}