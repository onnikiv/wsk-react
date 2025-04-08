import {useLocation} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const item = state.item;

  const handleClick = () => {
    setSelectedItem(null);
  };
  return (
    <>
      {item && (
        <dialog open>
          <button onClick={handleClick}>&#10005;</button>
          {item.media_type.includes('video') ? (
            <video src={item.filename} controls></video>
          ) : (
            <img src={item.filename} alt={item.title} />
          )}
          <h3>Title: {item.title}</h3>
          <p>{item.description}</p>
        </dialog>
      )}
    </>
  );
};
export default Single;
