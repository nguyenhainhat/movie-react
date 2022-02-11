import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import "./modal.scss";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = props => {

    const contentRef = useRef(null)

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('active')
        if(props.onClose) props.onClose();
    }

    return (
        <div ref={contentRef} className="modal_content">
          <p>
            {props.children}
          </p>
            <div className="modal_content_close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    )
}

export default Modal;
