
import MatxSuspense from '../MatxSuspense';
//import { MatxSuspense } from 'app/components';
import useSettings from '../../hooks/useSettings';
//import useSettings from 'app/hooks/useSettings';
import { MatxLayouts } from './index';

const MatxLayout = (props:any) => {
  const { settings } = useSettings();
  const Layout = MatxLayouts[settings.activeLayout];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
};

export default MatxLayout;
