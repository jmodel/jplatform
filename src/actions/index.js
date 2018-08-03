import { Map as ImmutableMap } from 'immutable';
import { initData as init } from './';

const initData_json = `{
  "themes": {
    "palette": {
      "type": "dark"
    }
  },
  "css": {
    "root": {
      "background": "green"
    },
    "override": {
      "background": "black"
    }
  },
  "defaultProps": {
    "Button": {
      "color": "primary",
      "variant": "contained",
      "className": {
        "root": false
      }
    },
    "Text": {}
  },
  "ui": {
    "/": [
      {
        "type": "EnhancedTable",
        "columnData": [
          {
            "id": "name",
            "numeric": false,
            "disablePadding": true,
            "label": "列1"
          },
          {
            "id": "calories",
            "numeric": true,
            "disablePadding": false,
            "label": "Calories"
          },
          {
            "id": "fat",
            "numeric": true,
            "disablePadding": false,
            "label": "Fat (g)"
          },
          {
            "id": "carbs",
            "numeric": true,
            "disablePadding": false,
            "label": "Carbs (g)"
          },
          {
            "id": "protein",
            "numeric": true,
            "disablePadding": false,
            "label": "Protein (g)"
          }
        ]
      },
      {
        "type": "Button",
        "onClick": "]]toABC",
        "children": "@@b",
        "style": {
          "background": "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        }
      },
      {
        "type": "Button",
        "variant": "extendedFab",
        "onClick": "]]openDialog",
        "className": {
          "root": "@@useRoot"
        },
        "children": [
          {
            "type": "NavigationIcon"
          },
          "@@b"
        ]
      },
      {
        "type": "Dialog",
        "open": "@@open",
        "onClose": "]]closeThisDialog",
        "children": [
          {
            "type": "DialogTitle",
            "children": "hello dialog title"
          },
          {
            "type": "DialogActions",
            "children": [
              {
                "type": "Button",
                "children": "第二个按钮",
                "variant": "fab",
                "onClick": "]]alert]]tt"
              },
              {
                "type": "Button",
                "children": "Button 2",
                "onClick": "]]alert]]ffff"
              },
              {
                "type": "Button",
                "children": "Button 2"
              }
            ]
          }
        ]
      }
    ],
    "/abc": [
      {
        "type": "Button",
        "onClick": "]]toHomepage",
        "children": "@@a"
      }
    ]
  },
  "func": {
    "alert": "return function (app, payload, state) { alert(payload)};",
    "openDialog": "return function (app, payload, state) { state['open']=true; return state;};",
    "closeThisDialog": "return function (app, payload, state) { state['open']=false; return state;};",
    "toABC": "return function (app, payload, state) { state['b']='OK Changed'; app.props.history.push('/abc'); return state;};",
    "toHomepage": "return function (app, payload, state) { app.props.history.push('/'); return state;};"
  },
  "route": [
    {
      "path": "/",
      "component": "$$",
      "routes": [
        {
          "path": "/bus",
          "component": "$$"
        }
      ]
    }
  ],
  "data": {
    "/": {
      "x": "open dialog",
      "b": "ChangeMe",
      "open": false,
      "useRoot": true
    },
    "/abc": {
      "a": "xxxsxx"
    }
  }
}`;

export function fetchInitData(url) {
  return (dispatch, getState) => {
    const initData = JSON.parse(initData_json);
    let themes;
    let css;
    let uiMap = ImmutableMap();
    let funcMap = ImmutableMap();
    let routeMap = ImmutableMap();
    let dataMap = ImmutableMap();
    let defaultPropsMap = ImmutableMap();
    var key, obj, prop, owns = Object.prototype.hasOwnProperty;
    for (key in initData) {
      if (owns.call(initData, key)) {
        obj = initData[key];
        if (key === 'defaultProps') {
          for (prop in obj) {
            if (owns.call(obj, prop)) {
              defaultPropsMap = defaultPropsMap.set(prop, obj[prop]);
            }
          }
        } else if (key === 'ui') {
          for (prop in obj) {
            if (owns.call(obj, prop)) {
              uiMap = uiMap.set(prop, obj[prop]);
            }
          }
        } else if (key === 'func') {
          for (prop in obj) {
            if (owns.call(obj, prop)) {
              funcMap = funcMap.set(prop, obj[prop]);
            }
          }
        } else if (key === 'route') {
          routeMap = routeMap.set(key, obj);
        } else if (key === 'css') {
          css = obj;
        } else if (key === 'themes') {
          themes = obj;
        } else if (key === 'data') {
          for (prop in obj) {
            if (owns.call(obj, prop)) {
              dataMap = dataMap.set(prop, obj[prop]);
            }
          }
        }
      }
    }

    dispatch(init(themes, css, defaultPropsMap, uiMap, funcMap, routeMap, dataMap));

    // dispatch(actions.receiveFetching({ pkg: true }))

    // fetch(url + '/api/npmPackage?npmPackage=' + name)
    //   .then( res => {
    //     if (res.status >= 400) { throw new Error("Error in response from server") }
    //     return res.json()
    //   })
    //   .then( res => {
    //     dispatch(actions.receivePkg(res.npmPackage))
    //     dispatch(actions.receiveFetching({ pkg: false }))
    //   })
  }
}

export function fetchData(url, name) {
  return (dispatch, getState) => {
    dispatch(actions.execute(ui_json));
    return ui_json;
  }
}

export function initData(themes, css, defaultPropsMap, uiMap, funcMap, routeMap, dataMap) {
  return {
    type: 'INIT_DATA',
    themes,
    css,
    defaultPropsMap,
    uiMap,
    funcMap,
    routeMap,
    dataMap
  }
}

export function initRoutes(routes) {
  return {
    type: 'INIT_ROUTES',
    routes
  }
}

export function execute(app, actionTerm, func, payload) {
  return {
    type: 'EXECUTE',
    app,
    actionTerm,
    func,
    payload
  }
}