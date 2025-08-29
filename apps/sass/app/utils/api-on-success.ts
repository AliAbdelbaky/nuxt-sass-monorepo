import type { IOnSuccessHandler } from '@pkgs/core-plugins';

const onSuccessHandler: IOnSuccessHandler = async (endpoint, data) => {
  console.log({
    endpoint,
    data,
  });
};

export default onSuccessHandler;
