const CANCELED_PAYLOAD = {
  isCanceled: true
};

const stubCancel = (): void => undefined;

export function makeCancelable<T>(promise: Promise<T>): [Promise<T>, () => void] {
  let cancel = stubCancel;
  const cancelPromise = new Promise<T>((resolve, reject) => {
    cancel = () => reject(CANCELED_PAYLOAD);
  });

  return [
    Promise.race([promise, cancelPromise]),
    cancel,
  ];
};

export function isCanceled(data: unknown): boolean {
  return Boolean(data === CANCELED_PAYLOAD);
}
