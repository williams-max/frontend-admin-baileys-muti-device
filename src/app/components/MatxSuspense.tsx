import { Suspense } from 'react';
import  MatxLoading from '../components/MatxLoading'
//import { MatxLoading } from 'app/components';

const MatxSuspense = ({ children }:any) => {
  return <Suspense fallback={<MatxLoading />}>{children}</Suspense>;
};

export default MatxSuspense;
