import { WPS_Enum } from '@/utils';

function onbuttonclick(idStr: string, param?: any) {
  if (typeof wps.Enum != 'object') {
    // 如果没有内置枚举值
    wps.Enum = WPS_Enum;
  }
  switch (idStr) {
    case 'dockLeft': {
      const tsId = wps.PluginStorage.getItem('taskpane_id');
      console.log(tsId);

      if (tsId) {
        const tskpane = wps.GetTaskPane(Number(tsId));
        tskpane.DockPosition = wps.Enum.msoCTPDockPositionLeft;
      }
      break;
    }
    case 'dockRight': {
      const tsId = wps.PluginStorage.getItem('taskpane_id');
      if (tsId) {
        const tskpane = wps.GetTaskPane(Number(tsId));
        tskpane.DockPosition = wps.Enum.msoCTPDockPositionRight;
      }
      break;
    }
    case 'hideTaskPane': {
      const tsId = wps.PluginStorage.getItem('taskpane_id');
      if (tsId) {
        const tskpane = wps.GetTaskPane(Number(tsId));
        tskpane.Visible = false;
      }
      break;
    }
    case 'addString': {
      const doc = wps.WpsApplication().ActiveDocument;
      if (doc) {
        // @ts-ignore
        doc.Range(0, 0).Text = 'Hello, wps加载项!';
        //好像是wps的bug, 这两句话触发wps重绘
        const rgSel = wps.WpsApplication().Selection.Range;
        if (rgSel) rgSel.Select();
      }
      break;
    }
    case 'getDocName': {
      const doc = wps.WpsApplication().ActiveDocument;
      if (!doc) {
        return '当前没有打开任何文档';
      }
      return doc.Name;
    }
    case 'openWeb': {
      // @ts-ignore
      wps.OAAssist.ShellExecute(param);
      break;
    }
  }
}

export default {
  onbuttonclick
};
