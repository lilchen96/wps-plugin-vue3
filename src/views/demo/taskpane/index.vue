<template>
  <div class="global">
    <div class="logo-icon">
      <svg-icon icon-class="logo"></svg-icon>
    </div>
    <div class="divItem">
      这是一个网页，按<span style="font-weight: bolder">"F12"</span>可以打开调试器。
    </div>
    <div class="divItem">
      这个示例展示了wps加载项的相关基础能力，与B/S业务系统的交互，请用浏览器打开：
      <span
        style="font-weight: bolder; color: slateblue; cursor: pointer"
        @click="onOpenWeb()"
        >{{ DemoSpan }}</span
      >
    </div>
    <div class="divItem">
      开发文档:
      <span style="font-weight: bolder; color: slateblue">https://open.wps.cn/docs/office</span>
    </div>
    <hr />
    <div class="divItem">
      <button
        style="margin: 3px"
        @click="onbuttonclick('dockLeft')">
        停靠左边
      </button>
      <button
        style="margin: 3px"
        @click="onbuttonclick('dockRight')">
        停靠右边
      </button>
      <button
        style="margin: 3px"
        @click="onbuttonclick('hideTaskPane')">
        隐藏TaskPane
      </button>
      <button
        style="margin: 3px"
        @click="onbuttonclick('addString')">
        文档开头添加字符串
      </button>
      <button
        style="margin: 3px"
        @click="onDocNameClick()">
        取文件名
      </button>

      <button
        style="margin: 3px"
        @click="onIndent()">
        段落缩进
      </button>

      <button
        style="margin: 3px"
        @click="onInsertTime()">
        selection插入时间
      </button>

      <button
        style="margin: 3px"
        @click="onActiveWindowDocument()">
        activeDocument
      </button>

      <button
        style="margin: 3px"
        @click="onCommentAdd()">
        add comments
      </button>

      <button
        style="margin: 3px"
        @click="onDialog()">
        add Dialog
      </button>

      <button
        style="margin: 3px"
        @click="onDocumentFields()">
        documentFields
      </button>

      <button
        style="margin: 3px"
        @click="onListCount()">
        lists count
      </button>

      <button
        style="margin: 3px"
        @click="onPage()">
        on page
      </button>

      <button
        style="margin: 3px"
        @click="onView()">
        view
      </button>

      <button
        style="margin: 3px"
        @click="onWindows()">
        windows
      </button>

      <button
        style="margin: 3px"
        @click="onXMLNOTES()">
        XML NODES
      </button>

      <button
        style="margin: 3px"
        @click="onSections()">
        Sections
      </button>

      <button
        style="margin: 3px"
        @click="onRange()">
        Range
      </button>

      <button
        style="margin: 3px"
        @click="onPane()">
        Pane
      </button>

      <button
        style="margin: 3px"
        @click="allOpenDocument()">
        all documents
      </button>

      <button
        style="margin: 3px"
        @click="toggleRevisions()">
        toggle revisions
      </button>

      <button
        style="margin: 3px"
        @click="getAllDocumentText()">
        document xml
      </button>

      <button
        style="margin: 3px"
        @click="onBatchDelete()">
        批注删除
      </button>

      <button
        style="margin: 3px"
        @click="onBatchEdit()">
        批注修改
      </button>

      <button
        style="margin: 3px"
        @click="getDocRange">
        获取Range
      </button>

      <button
        style="margin: 3px"
        @click="openDialog">
        open customDialog
      </button>

      <button
        style="margin: 3px"
        @click="closeDialog">
        close Dialog
      </button>

      <button
        style="margin: 3px"
        @click="setPosition(4)">
        setPositionCenter
      </button>

      <button
        style="margin: 3px"
        @click="setPosition(2)">
        setPositionRight
      </button>

      <button
        style="margin: 3px"
        @click="onLastParagraph">
        最后一行追加
      </button>

      <button
        style="margin: 3px"
        @click="commentShowBy">
        获取comment
      </button>

      <button
        style="margin: 3px"
        @click="gotoSelection">
        Selection goto
      </button>
    </div>
    <hr />
    <div class="divItem">
      文档文件名为：<span>{{ docName }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import taskPane from './index';
import { ref } from 'vue';
const DemoSpan = ref('');
const docName = ref('');

function onbuttonclick(id: string) {
  return taskPane.onbuttonclick(id);
}
function onDocNameClick() {
  docName.value = taskPane.onbuttonclick('getDocName') ?? '';
}
function onOpenWeb() {
  taskPane.onbuttonclick('openWeb', DemoSpan.value);
}
function onIndent() {
  wps.WpsApplication().ActiveDocument.Paragraphs.Indent();
  // @ts-ignore
  wps.WpsApplication().ActiveDocument.Paragraphs.Item(1).Outdent();
}
function onInsertTime() {
  wps.WpsApplication().Selection.InsertDateTime();
}
function onActiveWindowDocument() {
  console.log(wps.WpsApplication().ActiveDocument);
  console.log(wps.WpsApplication().ActiveDocument.ActiveWindow);
  console.log(
    wps.WpsApplication().ActiveDocument.ActiveWindow === wps.WpsApplication().ActiveWindow
  );
}
function onCommentAdd() {
  let comment = wps
    .WpsApplication()
    .ActiveDocument.Comments.Add(wps.WpsApplication().Selection.Range, '添加批注测试');
  // @ts-ignore
  if (!comment.IsInk) {
    // @ts-ignore
    comment.Author = 'AI';
  }
  // @ts-ignore
  comment.Scope.Select();
}
function onDialog() {
  // @ts-ignore
  wps.WpsApplication().Dialogs.Item(80).Show();
}
function onDocumentFields() {
  console.log(wps.WpsApplication().ActiveDocument.DocumentFields);
  console.log(wps.WpsApplication().ActiveDocument.DocumentFields.Item(1));
}
function onListCount() {
  // @ts-ignore
  wps.WpsApplication().ActiveDocument.Lists.Item(1).Range.Underline = 3;
}
function onPage() {
  let pageRectangles = wps
    .WpsApplication()
    .ActiveDocument.ActiveWindow.Panes.Item(1)
    // @ts-ignore
    .Pages.Item(1).Rectangles;
  console.log('rect angles ---> ', pageRectangles);
}
function onView() {
  let view = wps.WpsApplication().ActiveDocument.ActiveWindow.View;
  console.log(view);
  wps.WpsApplication().ActiveDocument.ActiveWindow.View.Zoom.Percentage = 200;
}
function onWindows() {
  wps.WpsApplication().Windows.Add(
    // @ts-ignore
    wps.WpsApplication().Documents.Item('xxxxxxx.docx').Windows.Item(1)
  );
}
function onXMLNOTES() {
  let objNode = wps.WpsApplication().ActiveDocument.XMLNodes;
  console.log(objNode);
}
function onSections() {
  let sections = wps.WpsApplication().ActiveDocument.Sections;
  console.log(sections.Item(1));
  console.log(sections.Item(1));
  console.log(sections.Item(1));
  console.log(sections.Item(1));
  console.log(sections.Item(1));
}
function onRange() {
  // @ts-ignore
  wps.WpsApplication().ActiveDocument.Paragraphs.Item(3).Range.Select();
  // wps.WpsApplication().Selection.Font.Bold = true;
  // @ts-ignore
  let range = wps.WpsApplication().ActiveDocument.Paragraphs.Item(3).Range;
  //  console.log('Range xml', wps.WpsApplication().ActiveDocument.Paragraphs.Item(3).Range.XML())

  console.log('Range 	Collapse', range.Text);
  console.log('range WordOpenXML', range.WordOpenXML);
  console.log('range Words', range.Words, range.Words.Count);
  console.log('range XMLNodes ', range.XMLNodes);

  for (let i = 3; i < 10; i++) {
    const currentRange = wps
      .WpsApplication()
      .ActiveDocument.Paragraphs.Item(i)
      // @ts-ignore
      .Next().Range;
    console.log(`index ${i + 1}`, currentRange.Text);
  }
}
function onPane() {
  let activeWindow = wps.WpsApplication().ActiveDocument.ActiveWindow;
  activeWindow.SplitVertical = 50;
  // @ts-ignore
  activeWindow.Panes.Item(1).Activate();
}
function allOpenDocument() {
  let documents = wps.WpsApplication().Documents;
  for (let i = 0; i < documents.Count; i++) {
    console.log(
      'original documents',
      // @ts-ignore
      documents.Item(i + 1).OriginalDocumentTitle
    );
    console.log(
      'RevisedDocumentTitle documents',
      // @ts-ignore
      documents.Item(i + 1).RevisedDocumentTitle
    );
    // @ts-ignore
    console.log(' documents Name', documents.Item(i + 1).Name);
  }

  console.log(wps.WpsApplication().ActiveDocument.Content.Text);
}
function toggleRevisions() {
  wps.WpsApplication().ActiveDocument.TrackRevisions =
    !wps.WpsApplication().ActiveDocument.TrackRevisions;
}

function getAllDocumentText() {
  console.log('get all documents');
  console.log(wps.WpsApplication().ActiveDocument.WordOpenXML);
}
function onBatchDelete() {
  // @ts-ignore
  wps.WpsApplication().ActiveDocument.Comments.Item(1).Delete();
}
function onBatchEdit() {
  wps
    .WpsApplication()
    .ActiveDocument.Comments.Item(1)
    // @ts-ignore
    .Range.InsertBefore('test');
}

// event
function onContentChangeHandle(doc: any, range: any, type: any) {
  console.log('--------- content  change handle ---->> start');
  console.log('doc', doc);
  console.log('range', range);
  console.log('type', type);
  console.log('--------- content  change handle ---->> end');
}

function getDocRange() {
  let range = getRangeByIndex(100, 105);
  console.log(range);
}
function getRangeByIndex(start_index: number, end_index: number) {
  let range = wps.WpsApplication().ActiveDocument.Range(start_index, end_index);
  return range;
}
function openDialog() {
  let width = 400 * window.devicePixelRatio;
  let height = 300 * window.devicePixelRatio;
  let result = wps
    .WpsApplication()
    // @ts-ignore
    .ShowDialog('https://www.wps.cn', 'wps网站', width, height, false);
  console.log('dialog', result);
}
function closeDialog() {
  console.log(wps.WpsApplication().Dialogs);
}
function setPosition(number: number) {
  let id = wps.PluginStorage.getItem('taskpane_id_demo');
  let pane = wps.GetTaskPane(Number(id));
  console.log(pane);
  pane.DockPosition = 1 || 4 || number;
  //pane.DockPosition = 4 || 4;
  setTimeout(() => {
    pane.DockPosition = 4;
  }, 1000);
}
function onLastParagraph() {
  let paragraph = wps.WpsApplication().ActiveDocument.Paragraphs.Last;
  paragraph.Range.InsertAfter('-最后一行');
}
function commentShowBy() {
  let comment = wps.WpsApplication().ActiveDocument.Comments.Item(1);
  console.log('>>>> comment ', comment);
}
function gotoSelection() {
  wps.WpsApplication().Selection.GoTo(6, 2);
}

axios.get('/.debugTemp/NotifyDemoUrl').then((res) => {
  DemoSpan.value = res.data;
});
// @ts-ignore
wps.ApiEvent.AddApiEventListener('ContentChange', onContentChangeHandle);
</script>

<style scoped>
.global {
  font-size: 15px;
  min-height: 95%;
}
.divItem {
  margin-left: 5px;
  margin-bottom: 18px;
  font-size: 15px;
  word-wrap: break-word;
}
.logo-icon {
  text-align: center;
}
.logo-icon .svg-icon {
  width: 100px;
  height: 100px;
}
</style>
