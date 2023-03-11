HTMLCanvasElement.prototype._PHIXER_getContext = HTMLCanvasElement.prototype.getContext;

HTMLCanvasElement.prototype.getContext = function (contextType, contextAttributes) {
  return this._PHIXER_getContext(contextType, { ...contextAttributes, willReadFrequently: true });
};
