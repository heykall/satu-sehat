import { Link } from 'react-router-dom';

const ButtonLink = ({ text, path, width, action }) => {
  return (
    <Link
      onClick={action}
      to={path}
      className={`${width} bg-teal-500 text-white font-semibold py-2.5 px-3.5 text-center rounded-md`}
    >
      {text}
    </Link>
  );
};

export default ButtonLink;