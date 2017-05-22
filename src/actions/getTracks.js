import { dispatch } from 'react-redux';

export const S3_BUCKET = 'quest-ost';

export default (bucket = S3_BUCKET, key) => dispatch => dispatch({
  middleware: 'S3',
  types: [
    'TRACKS_REQUEST',
    'TRACKS_SUCCESS',
    'TRACKS_FAILURE',
  ],
  bucket,
  key,
});
