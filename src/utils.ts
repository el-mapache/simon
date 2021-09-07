function isPureObject(maybeObj: any) {
  const type = typeof maybeObj;

  return type === 'object' && maybeObj !== null && !(maybeObj instanceof Array);
}

function times<T>(count: number, iterator: () => any): T[] {
  return new Array(count).fill(undefined).map(iterator);
}

function sample(list: any[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), time);
  });
}

function throttle(handler: (...args: any[]) => void, time: number) {
  let waiting = false;

  return function (...args: any[]) {
    if (!waiting) {
      handler.apply(handler, args);

      waiting = true;

      setTimeout(function () {
        waiting = false;
      }, time);
    }
  };
}

function isNull(value: any) {
  return value === null || typeof value === 'undefined';
}

export { times, sample, sleep, isPureObject, throttle, isNull };
