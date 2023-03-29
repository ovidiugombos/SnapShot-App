import React, { useEffect, useRef } from "react";

export default function Modal(props) {
  const overlay = useRef(null);
  const modal = useRef(null);
  const modalImage = useRef(null);
  //   console.log(overlay.current.classList);

  useEffect(function () {
    if (props.display) {
      toggleClass("hidden");
      modalImage.current.src = props.modalPhotoUrl;
    }
  });

  function closeModal() {
    toggleClass("hidden");
    //to keep the modal appearence state updated ->
    props.handleModal();
  }

  function toggleClass(className) {
    overlay.current.classList.toggle(className);
    modal.current.classList.toggle(className);
  }

  return (
    <div>
      <div ref={modal} className="modal hidden">
        <div className="modal--image_container">
          <img ref={modalImage} className="modal--image" src="" />
        </div>
      </div>
      <div ref={overlay} onClick={closeModal} className="overlay hidden">
        <p className="overlay--close">×</p>
      </div>
    </div>
  );
}
