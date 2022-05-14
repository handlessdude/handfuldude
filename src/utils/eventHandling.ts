export function createEvent(
  type: string,
  bubbles = false,
  cancelable = false,
  composed = false
) {
  return new Event(type, { bubbles, cancelable, composed });
  //is it neccessary to support internet explorer?....

  // IE9+ and other modern browsers
  //   if ("createEvent" in document) {
  //     var e = document.createEvent("HTMLEvents");
  //     e.initEvent(type, false, true);
  //     elem.dispatchEvent(e);
  //   } else {
  //     // IE8
  //     var e = document.createEventObject();
  //     e.eventType = type;
  //     elem.fireEvent("on" + e.eventType, e);
  //   }
}

interface IKeyboardEventConfig {
  key: string;
  code?: string; //code has the name of the key.
  which?: number; //which has the keyboard key number.
  shiftKey?: boolean; //shiftKey sets whether we want to press the shift key in addition to the key we’re pressing.
  ctrlKey?: boolean; //ctrlKey sets whether we want to press the Ctrl key in addition to the key we’re pressing.
  metaKey?: boolean;
}
export function createKeyboardEvent(
  type: string,
  config: IKeyboardEventConfig
) {
  //const e = new KeyboardEvent(type, config);
  //elem.dispatchEvent(e);
  return new KeyboardEvent(type, config);
}
