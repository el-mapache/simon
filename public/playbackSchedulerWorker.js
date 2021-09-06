const schedulingInterval = 400;
let interval = null;

const context = this;
context.addEventListener('message', (event) => {
  const { command } = event.data;

  if (command === 'stop') {
    interval && clearInterval(interval);
    return;
  }

  if (command === 'start') {
    interval && clearInterval(interval);
    interval = setInterval(
      () => context.postMessage({ command: 'tick ' }),
      400
    );
  }
});
