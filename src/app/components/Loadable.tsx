import { Suspense } from 'react';
import Loading from './MatxLoading';

const Loadable = (Component:any) => (props:any) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
