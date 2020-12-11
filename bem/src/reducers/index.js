import app              from './app';
import auth             from './auth';
import version          from './version';
import project          from './project';
import dashboardOptions from './dashboardOptions';
import simulation       from './simulation';
import contexts         from './contexts';
import templates        from './templates';
import notification     from './notification';
import idfDocument      from './idfDocument';
import iframeCover      from './iframeCover';


import { reducer as idfEditor }        from '../modules/IdfEditor';
import { reducer as projects }         from '../modules/Projects';
import { reducer as views }            from '../modules/Views';
import { reducer as charts }           from '../modules/Charts';
import { reducer as simulators }       from '../modules/Simulators';
import { reducer as simulatorResults } from '../modules/SimulatiorResults';
import { reducer as chartEditor}       from '../modules/ChartEditor';
import { reducer as addons }           from '../modules/Addons';
import { reducer as dock }             from '../modules/Dock';

export default {
  app,
  auth,
  dock,
  iframeCover,
  version,
  idfEditor,
  projects,
  views,
  project,
  simulation,
  dashboardOptions,
  charts,
  simulators,
  simulatorResults,
  chartEditor,
  addons,
  contexts,
  templates,
  notification,
  idfDocument
};
