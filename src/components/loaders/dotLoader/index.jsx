import styles from './styles.module.scss';
import DotLoader from 'react-spinners/DotLoader';
import PuffLoader from 'react-spinners/PuffLoader';

const DotLoaderSpinner = ({ loading }) => {
  return (
    <div className={styles.loader}>
      <PuffLoader color="#005e0d" loading={loading} size={150}/>
    </div>
  );
};

export default DotLoaderSpinner;
