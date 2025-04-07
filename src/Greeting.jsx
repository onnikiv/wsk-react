import PropTypes from 'prop-types';
const Greeting = (props) => {
  return (
    <>
      <h4>Moi, {props.name}</h4>
      <p>Jau</p>
    </>
  );
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
