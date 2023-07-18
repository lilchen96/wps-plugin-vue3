function openOfficeFileFromSystemDemo(param: any) {
  const jsonObj = typeof param == 'string' ? JSON.parse(param) : param;
  alert('从业务系统传过来的参数为：' + JSON.stringify(jsonObj));
  return { wps加载项项返回: jsonObj.filepath + ', 这个地址给的不正确' };
}

function InvokeFromSystemDemo(param: any) {
  const jsonObj = typeof param == 'string' ? JSON.parse(param) : param;
  const handleInfo = jsonObj.Index;
  switch (handleInfo) {
    case 'getDocumentName': {
      let docName = '';
      if (wps.WpsApplication().ActiveDocument) {
        docName = wps.WpsApplication().ActiveDocument.Name;
      }

      return { 当前打开的文件名为: docName };
    }

    case 'newDocument': {
      let newDocName = '';
      const doc = wps.WpsApplication().Documents.Add();
      // @ts-ignore
      newDocName = doc.Name;

      return { 操作结果: '新建文档成功，文档名为：' + newDocName };
    }

    case 'OpenFile': {
      const filePath = jsonObj.filepath;
      // @ts-ignore
      wps.WpsApplication().Documents.OpenFromUrl(filePath);
      return { 操作结果: '打开文件成功' };
    }
  }

  return { 其它xxx: '' };
}

export default {
  openOfficeFileFromSystemDemo,
  InvokeFromSystemDemo
};
