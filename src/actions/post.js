export default function postMessage(input) {
  return {
    type: 'POST_MESSAGE',
    input
  };
  // @TODO Hook up middleware for server PUT
  // return dispatch => dispatch({
  //   data: {
  //     types: [
  //       'POST_MESSAGE',
  //       'POST_MESSAGE_SUCCESS',
  //       'POST_MESSAGE_FAILURE',
  //     ],
  //   },
  // });
}
