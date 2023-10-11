export function Required(): Function {
  return function (targetClass: Object, propertyKey: string) {
    let value: string = targetClass[propertyKey];

    const getter = () => {
      if (!value) throw new Error(`Attribute ${propertyKey} is required`);
      return value;
    };

    const setter = newValue => {
      value = newValue;
    };

    Object.defineProperty(targetClass, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
