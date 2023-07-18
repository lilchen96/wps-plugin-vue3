import { WPS_Enum } from '@/utils';
import SystemDemo from '@/utils/systemdemo';

//这个函数在整个wps加载项中是第一个执行的
function OnAddinLoad(ribbonUI: any) {
  if (typeof wps.ribbonUI != 'object') {
    wps.ribbonUI = ribbonUI;
  }

  if (typeof wps.Enum != 'object') {
    // 如果没有内置枚举值
    wps.Enum = WPS_Enum;
  }

  //这几个导出函数是给外部业务系统调用的
  window.openOfficeFileFromSystemDemo = SystemDemo.openOfficeFileFromSystemDemo;
  window.InvokeFromSystemDemo = SystemDemo.InvokeFromSystemDemo;

  wps.PluginStorage.setItem('EnableFlag', false); //往PluginStorage中设置一个标记，用于控制两个按钮的置灰
  wps.PluginStorage.setItem('ApiEventFlag', false); //往PluginStorage中设置一个标记，用于控制ApiEvent的按钮label
  return true;
}

let WebNotifycount = 0;
function OnAction(control: any) {
  const eleId = control.Id;
  switch (eleId) {
    case 'btnShowMsg':
      {
        const doc = wps.WpsApplication().ActiveDocument;
        if (!doc) {
          alert('当前没有打开任何文档');
          return;
        }
        alert('<div>这是一条消息</div>');
      }
      break;
    case 'btnIsEnbable': {
      const bFlag = wps.PluginStorage.getItem('EnableFlag');
      wps.PluginStorage.setItem('EnableFlag', !bFlag);

      //通知wps刷新以下几个按饰的状态
      wps.ribbonUI.InvalidateControl('btnIsEnbable');
      wps.ribbonUI.InvalidateControl('btnShowMsg');
      //wps.ribbonUI.Invalidate(); 这行代码打开则是刷新所有的按钮状态
      break;
    }
    case 'btnApiEvent':
      {
        const bFlag = wps.PluginStorage.getItem('ApiEventFlag');
        const bRegister = bFlag ? false : true;
        wps.PluginStorage.setItem('ApiEventFlag', bRegister);
        if (bRegister) {
          wps.ApiEvent.AddApiEventListener(
            // @ts-ignore
            'DocumentNew',
            'ribbon.OnNewDocumentApiEvent'
          );
        } else {
          wps.ApiEvent.RemoveApiEventListener(
            'DocumentNew',
            // @ts-ignore
            'ribbon.OnNewDocumentApiEvent'
          );
        }

        wps.ribbonUI.InvalidateControl('btnApiEvent');
      }
      break;
    case 'btnWebNotify':
      {
        const currentTime = new Date();
        const timeStr =
          currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
        wps.OAAssist.WebNotify(
          '这行内容由wps加载项主动送达给业务系统，可以任意自定义, 比如时间值:' +
            timeStr +
            '，次数：' +
            ++WebNotifycount,
          true
        );
      }
      break;
    case 'btnDemoApp1':
      {
        const tsId = wps.PluginStorage.getItem('taskpane_id_demo');
        if (!tsId) {
          const tskpane = wps.CreateTaskPane(
            `${window.location.protocol}//${window.location.host}` + '/#/demo-taskpane',
            'demo-taskpane'
          );
          const id = tskpane.ID;
          wps.PluginStorage.setItem('taskpane_id_demo', id);
          tskpane.Visible = true;
        } else {
          const tskpane = wps.GetTaskPane(Number(tsId));
          tskpane.Visible = !tskpane.Visible;
        }
      }
      break;
    case 'btnDemoApp2':
      {
        wps.ShowDialog(
          `${window.location.protocol}//${window.location.host}` + '/#/demo-dialog',
          '这是一个对话框网页',
          400 * window.devicePixelRatio,
          400 * window.devicePixelRatio,
          false
        );
      }
      break;
    default:
      break;
  }
  return true;
}

function GetImage(control: any) {
  const eleId = control.Id;
  switch (eleId) {
    case 'btnDemo':
      return 'images/icon-64.png';
    default:
      return 'images/icon-64.png';
  }
}

function OnGetEnabled(control: any) {
  const eleId = control.Id;
  switch (eleId) {
    case 'btnShowMsg': {
      const bFlag = wps.PluginStorage.getItem('EnableFlag');
      return bFlag;
    }
    default:
      break;
  }
  return true;
}

function OnGetVisible(control: any) {
  const eleId = control.Id;
  console.log(eleId);
  return true;
}

function OnGetLabel(control: any) {
  const eleId = control.Id;
  switch (eleId) {
    case 'btnIsEnbable': {
      const bFlag = wps.PluginStorage.getItem('EnableFlag');
      return bFlag ? '按钮禁用' : '按钮启用';
    }
    case 'btnApiEvent': {
      const bFlag = wps.PluginStorage.getItem('ApiEventFlag');
      return bFlag ? '清除新建文件事件' : '注册新建文件事件';
    }
  }
  return '';
}

function OnNewDocumentApiEvent(doc: Document) {
  alert('新建文件事件响应，取文件名: ' + doc.title);
}

//这些函数是给wps客户端调用的
export default {
  OnAddinLoad,
  OnAction,
  GetImage,
  OnGetEnabled,
  OnGetVisible,
  OnGetLabel,
  OnNewDocumentApiEvent
};
