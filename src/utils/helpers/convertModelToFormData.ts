import { Generic } from '../../interfaces';

export const convertModelToFormData = (model: Generic, form?: FormData, namespace = ''): FormData => {
  const formData = form || new FormData();

  if (typeof model === 'string') {
    formData.append(namespace, model);
  } else {
    Object.keys(model).forEach((key) => {
      if (!model[key]) {
        return;
      }
      const formKey = namespace ? `${namespace}[${key}]` : key;
      if (model[key] instanceof Date) {
        formData.append(formKey, model[key].toISOString());
      } else if (model[key] instanceof Array) {
        model[key].forEach((element: any, index: number) => {
          const tempFormKey = `${formKey}[${index}]`;
          convertModelToFormData(element, formData, tempFormKey);
        });
      } else if (typeof model[key] === 'object' && !(model[key] instanceof File)) {
        convertModelToFormData(model[key], formData, formKey);
      } else if (model[key] instanceof File) {
        formData.append(formKey, model[key]);
      } else {
        formData.append(formKey, model[key].toString());
      }
    });
  }

  return formData;
};

export default { convertModelToFormData };
