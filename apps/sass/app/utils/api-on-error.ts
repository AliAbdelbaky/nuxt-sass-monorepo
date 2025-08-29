import type { IOnErrorHandler } from '@pkgs/core-plugins';

const onErrorHandler: IOnErrorHandler = async (status, err) => {
  console.log({
    status,
    err,
  });
};

export default onErrorHandler;
