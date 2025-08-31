type ITestService = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}[];
// set API_BASE_URL to https://jsonplaceholder.typicode.com
export const getTestService = async <T = ITestService>(): Promise<T | undefined> => {
  const { $api_provider } = useNuxtApp();
  return await $api_provider!<T>('/todos', {
    method: 'GET',
  });
};
