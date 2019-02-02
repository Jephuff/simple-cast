declare module "load-script" {
  const func: (url: string, callback: (err: null | {}) => void) => void;
  export = func;
}
