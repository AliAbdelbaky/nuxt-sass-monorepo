import type { IOnErrorHandler } from '~/modules/api-provider/runtime/api-utils';

const onErrorHandler: IOnErrorHandler = async (status, err) => {
  console.log({
    status,
    err,
  });
};

export default onErrorHandler;
