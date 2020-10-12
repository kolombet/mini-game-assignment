export interface SignalCallback<ArgType> {
  (arg: ArgType);
}

export default class Signal<ArgType> {
  private _callbacks: SignalCallback<ArgType>[] = [];

  public add(callback: SignalCallback<ArgType>) {
    this._callbacks.push(callback);
  }

  public clear(callback: SignalCallback<ArgType>): void {
    const index = this._callbacks.indexOf(callback);
    if (index >= 0) {
      this._callbacks.splice(index, 1);
    } else {
      throw new Error("Trying to remove unexisting callback");
    }
  }

  public dispatch(arg: ArgType) {
    const len = this._callbacks.length;
    for (let i = len; i > 0; i--) {
      const callback = this._callbacks[i - 1];
      if (!callback) {
        throw new Error("callback undefined");
      }
      callback(arg);
    }
  }
}
