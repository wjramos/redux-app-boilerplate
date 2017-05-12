import 'isomorphic-fetch';
import request from 'request-promise';

const GEOLOCATE_OPTIONS = {
  // enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
}

function getLocation() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(coords),
      err => reject(err),
      GEOLOCATE_OPTIONS,
    )
  );
}

export default (/* store */) => next => async action => {
  const { types, middleware } = action;

  if (middleware === 'GEOLOCATE') {
    const [requestType, successType, failureType] = types;
    next(Object.assign(
      {},
      action,
      { type: requestType }
    ));

    let location;

    if (navigator.geolocation) {
      try {
        location = await getLocation();
      } catch (err) {
        return next({
          type: failureType,
          error: err.message || 'Something bad happened',
        });
      }
    } else {
      // Browser does not have geolocation, use alternate method
    }

    const { latitude, longitude } = location;

    return next({
      type: successType,
      location: { latitude, longitude },
    });
  }

  return next(action);
};
