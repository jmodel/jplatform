import { Map as ImmutableMap } from 'immutable';

const initialState = ImmutableMap();

export function dos(state = initialState, action = null) {
  const { type, app, actionTerm, themes, css, defaultPropsMap, uiMap, funcMap, routeMap, dataMap, func, payload, routes } = action;
  switch (type) {
    case 'INIT_DATA':
      return state.set('themes', themes).set('css', css).set('defaultProps', defaultPropsMap).set('ui', uiMap).set('func', funcMap).set('route', routeMap).set('data', dataMap);
    case 'INIT_ROUTES':
      return state.set('routes', routes);
    case 'EXECUTE':
      const dataState = state.get('data');
      const path = location.pathname;
      let dfunc = Function(func.get(actionTerm))();
      let dataPathState = dfunc(app, payload, dataState.get(path));
      if (typeof dataPathState === 'undefined') {
        return state;
      } else {
        return state.set('changing', Math.random()).set('data', dataState.set(path, dataPathState));
      }
    default:
      return state;
  }
}