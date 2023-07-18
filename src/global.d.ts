import 'wps-jsapi';

declare global {
  namespace wps {
    export let ribbonUI: any;
    export let Enum: any;
  }
  interface Window {
    ribbon: any;
    openOfficeFileFromSystemDemo: Function;
    InvokeFromSystemDemo: Function;
  }
}
