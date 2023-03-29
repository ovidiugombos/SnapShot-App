import React, { useContext, useRef } from "react";
import ImgContext from "../ContextAPI/ImgContext";
import Modal from "./Modal";
export default function DisplayImages(props) {
  const [imagesUrl, setImagesUrl] = React.useState([]);
  const [displayModal, setDisplayModal] = React.useState(false);
  const [modalPhotoUrl, setModalPhotoUrl] = React.useState("");
  const imagesPerPage = useRef(20);
  const keyword = useContext(ImgContext);
  const lastPhotoIndex = imagesPerPage.current * props.currentPage;
  const firstPhotoIndex = lastPhotoIndex - imagesPerPage.current;

  console.log(lastPhotoIndex, firstPhotoIndex);
  function generateApiUrl() {
    return `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e7760daac1feb67ae4893bfa07ae4c31&text=${keyword}&sort=relevance&format=json&nojsoncallback=1
    `;
  }

  React.useEffect(() => {
    setImagesUrl("");
    const apiUrl = generateApiUrl();
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const { photo } = data.photos;
        const currentPosts = photo.slice(firstPhotoIndex, lastPhotoIndex);

        console.log(currentPosts);
        handleImages(currentPosts);
      });
  }, [keyword, props.currentPage]);

  function handleImages(photo) {
    const newImagesUrls = photo.map((img) => (
      <div className="image">
        <img
          onClick={handleModal}
          className="generated--image"
          src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
          id={`${img.id}`}
        />
      </div>
    ));
    setImagesUrl(newImagesUrls);
  }

  function handleModal(e) {
    setDisplayModal((prevValue) => !prevValue);
    e && setModalPhotoUrl(e.target.src);
  }

  return (
    <>
      <Modal
        handleModal={handleModal}
        display={displayModal}
        modalPhotoUrl={modalPhotoUrl}
      />
      <div className="images--container">{imagesUrl}</div>
    </>
  );
}
