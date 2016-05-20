import React, { Component, PropTypes } from 'react';
import {Modal, Button} from 'react-bootstrap';
import cx from './DeleteModal.styl';

export default class deleteModal extends Component {
    static PropTypes = {
        object: PropTypes.string,
        active: PropTypes.bool,
        onDelete: PropTypes.func,
        onClose: PropTypes.func
    }


    render() {
        const { onDelete, onClose, active, object } = this.props;
        return (
                <Modal show={active} onHide={onClose} >
                    <Modal.Header>
                        <Modal.Title>{object}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you really want to delete ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onClose}>Close</Button>
                        <Button onClick={onDelete} bsStyle="danger" >Delete</Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}



