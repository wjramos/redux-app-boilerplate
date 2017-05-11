import 'isomorphic-fetch';
import request from 'request-promise';

const GEOLOCATE_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
}

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      err => reject(err),
      GEOLOCATE_OPTIONS,
    );
  });
}

export default (/* store */) => next => async action => {
  const { types: [requestType, successType, failureType], middleware } = action;
  if (middleware === 'GEOLOCATE') {
    next(Object.assign(
      {},
      action,
      { type: requestType }
    ));

    if (navigator.geolocation) {
      try {
        const location = await getLocation();

        return next({
          type: successType,
          location,
        });
      } catch (err) {
        return next({
          type: failureType,
          error: err.message || 'Something bad happened',
        });
      }
    } else {
      // Browser does not have geolocation, alternate method
    }
  }

  return next(action);
};
