// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import { ApplyPluginsType } from 'umi';
import { createHistory } from './core/history';
import { createPluginManager, getPluginManager as getDumiPluginManager } from './core/plugin';
import './core/polyfill';
import { getRoutes } from './core/route';
import { renderClient } from '/Users/dominicleo/za/zarm/node_modules/.pnpm/@umijs+renderer-react@4.0.69_react-dom@18.1.0+react@18.1.0/node_modules/@umijs/renderer-react';
import { setPluginManager as setDumiPluginManager } from '/Users/dominicleo/za/zarm/node_modules/.pnpm/dumi@2.2.1_7700272a42f35b82f4df09ea36057196/node_modules/dumi/dist/client/theme-api/utils.js';

const publicPath = '/';
const runtimePublicPath = false;

async function render() {
  const pluginManager = createPluginManager();
  const { routes, routeComponents } = await getRoutes(pluginManager);

  // allow user to extend routes
  await pluginManager.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: {
      routes,
      routeComponents,
    },
  });

  const contextOpts = pluginManager.applyPlugins({
    key: 'modifyContextOpts',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });

  const basename = contextOpts.basename || '/';
  const historyType = contextOpts.historyType || 'browser';

  const history = createHistory({
    type: historyType,
    basename,
    ...contextOpts.historyOpts,
  });

  return pluginManager.applyPlugins({
    key: 'render',
    type: ApplyPluginsType.compose,
    initialValue() {
      const context = {
        routes,
        routeComponents,
        pluginManager,
        rootElement: contextOpts.rootElement || document.getElementById('root'),
        publicPath,
        runtimePublicPath,
        history,
        historyType,
        basename,
        callback: contextOpts.callback,
      };
      const modifiedContext = pluginManager.applyPlugins({
        key: 'modifyClientRenderOpts',
        type: ApplyPluginsType.modify,
        initialValue: context,
      });
      return renderClient(modifiedContext);
    },
  })();
}

// always remove trailing slash from location.pathname
if (
  typeof history !== 'undefined' &&
  location.pathname.length > 1 &&
  location.pathname.endsWith('/')
) {
  history.replaceState({}, '', location.pathname.slice(0, -1) + location.search + location.hash);
}

(function () {
  var cache =
    (typeof navigator !== 'undefined' &&
      navigator.cookieEnabled &&
      typeof window.localStorage !== 'undefined' &&
      localStorage.getItem('dumi:prefers-color')) ||
    'auto';
  var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var enums = ['light', 'dark', 'auto'];

  document.documentElement.setAttribute(
    'data-prefers-color',
    cache === enums[2]
      ? isDark
        ? enums[1]
        : enums[0]
      : enums.indexOf(cache) > -1
      ? cache
      : enums[0],
  );
})();
render();

window.g_umi = {
  version: '4.0.69',
};

setDumiPluginManager(getDumiPluginManager());
