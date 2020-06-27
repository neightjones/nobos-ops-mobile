import { apiUrl, getHeaders, fetchThrowable } from 'utils/fetch';

export const IS_FETCHING_CHAIN = 'IS_FETCHING_CHAIN';
export const ON_CHAIN_RECEIVED = 'ON_CHAIN_RECEIVED';

const setFetchingChain = isFetching => ({
  type: IS_FETCHING_CHAIN,
  isFetching,
});

const onChainReceived = chain => ({
  type: ON_CHAIN_RECEIVED,
  chain,
});

export const fetchChain = () => async dispatch => {
  try {
    dispatch(setFetchingChain(true));
    const headers = await getHeaders();
    const res = await fetchThrowable(`${apiUrl}/api/v1/chains/me`, { headers });
    const json = await res.json();
    dispatch(onChainReceived(json.chain));
  } catch (e) {
    console.error(`Failed fetchChain: ${e}`);
  } finally {
    dispatch(setFetchingChain(false));
  }
};