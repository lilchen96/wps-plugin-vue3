function onbuttonclick(idStr: string, param?: any) {
  switch (idStr) {
    case 'getDocName': {
      const doc = wps.WpsApplication().ActiveDocument;
      if (!doc) {
        return '当前没有打开任何文档';
      }
      return doc.Name;
    }
    case 'createTaskPane': {
      const tsId = wps.PluginStorage.getItem('taskpane_id');
      if (!tsId) {
        const tskpane = wps.CreateTaskPane(
          `${window.location.protocol}//${window.location.host}` + '/#/taskpane',
          'taskpane'
        );
        const id = tskpane.ID;
        wps.PluginStorage.setItem('taskpane_id', id);
        tskpane.Visible = true;
      } else {
        const tskpane = wps.GetTaskPane(Number(tsId));
        tskpane.Visible = true;
      }
      break;
    }
    case 'newDoc': {
      wps.WpsApplication().Documents.Add();
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
    case 'closeDoc': {
      if (wps.WpsApplication().Documents.Count < 2) {
        alert('当前只有一个文档，别关了。');
        break;
      }

      const doc = wps.WpsApplication().ActiveDocument;
      if (doc) doc.Close();
      break;
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
