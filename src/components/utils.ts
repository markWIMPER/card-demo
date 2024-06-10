export function useSetComponentRefs(refs) {
  let formRefs = refs;
  const setItemRef = (el, key) => {
    if (el && key) {
      formRefs[key] = el;
    }
  };

  const clearItemRef = () => {
    formRefs = {};
  };
  const getFormRefs = () => {
    return formRefs;
  };

  const deleteFormItemRef = (key) => {
    delete formRefs[key];
  };

  return { setItemRef, formRefs, clearItemRef, getFormRefs, deleteFormItemRef };
}
