type Value = string | number | boolean | Record<string, string | number> | File | undefined | null;

function append(formData: FormData, key: string, value: Value) {
  if (value instanceof File) {
    return formData.append(key, value);
  }

  switch(typeof value) {
    case 'string':
      return formData.append(key, value);
    case 'number':
      return formData.append(key, value.toString());
    case 'boolean':
      return formData.append(key, value ? '1' : '0');
    case 'object':
      return formData.append(key, JSON.stringify(value));
    default:
      throw new Error(`Unallowed value type to append: ${typeof value}`);
  }
}

export function createFormData(values: Record<string, Value>) {
  const formData = new FormData();
  Object.keys(values).forEach((key) => append(formData, key, values[key]));
  return formData;
}
