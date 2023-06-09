export const addTodoVaildate = (props) => {
  console.log("todoValue", props.target.value.length);
  if (props.target.value.length === 0) {
    return;
  }
};
