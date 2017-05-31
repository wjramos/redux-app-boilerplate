const INITIAL_STATE = '';

export default function brandReducer(state = INITIAL_STATE, { type, brand }) {
  if (type.includes('BRAND_')) {
    if (type === 'BRAND_SET') {
      return brand;
    }
  }

  return state;
}

brandReducer.initialState = INITIAL_STATE;
