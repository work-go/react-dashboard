type AnyError =
  | {
      type: "error";
      error: Error;
    }
  | {
      type: "unknown";
      error: unknown;
    };

export const safeTryAsync = async <T>(
  promise: () => Promise<T>
): Promise<[T, null] | [null, AnyError]> => {
  try {
    const data = await promise();
    console.log("safeTryAsync: data", data);
    return [data, null];
  } catch (throwable) {
    if (throwable instanceof Error) {
      return [
        null,
        {
          type: "error",
          error: throwable,
        },
      ];
    }
    return [null, { type: "unknown", error: throwable }];
  }
};
