import type { IOnSuccessHandler } from '~/modules/api-provider/runtime/api-utils';

const onSuccessHandler: IOnSuccessHandler = async (endpoint, data) => {
  console.log({
    endpoint,
    data,
  });
};

export default onSuccessHandler;
