import React from 'react';
import "../styles/modal.css"
import Button from '../components/shared/button';
import { ModalInterface } from '../interfaces/modalInterface';

function CustomModal(props:ModalInterface){
    return(
        <div id="open-modal" className="modal-window">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close-btn cpointer"
                        onClick={()=> props.closeModal()}
                    >
                        &times;
                    </span>
                </div>
                <div className="modal-body">
                    <div className="flex" style={{justifyContent: 'center'}}>
                        <div>
                            <img src={props.icon} alt="success" />
                        </div>
                        <div className="modal-msg">
                            {props.message}
                        </div>
                    </div>
                    <div className="modal-btn">
                        <Button
                            text="Ok"
                            class="btn accept"
                            closeModal={props.closeModal}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomModal;