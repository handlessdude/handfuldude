export function triggerEvent(
  elem: HTMLElement,
  type: string,
  bubbles = false,
  cancelable = false,
  composed = false
) {
  const e = new Event(type, { bubbles, cancelable, composed });
  elem.dispatchEvent(e);

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

//here would also go gesture reducer
