import BarLoader from 'react-spinners/BarLoader';
import styles from './styles.module.scss';
import DotLoader from 'react-spinners/DotLoader'

const DotLoaderSpinner2 = ({loading}) => {
  return (
    <div className={styles.loader}>
      <BarLoader color='#005e0d' loading={loading}/>
    </div>
  )
}

export default DotLoaderSpinner2
