const validateName = (name) => {
  if (name.length > 3) {
    return false;
  } else return true;
};

const validatePhone = (phone) => {
  if (phone !== undefined) {
    if (phone.length === 12 || phone.length === 0) {
      return false;
    }
    if (phone === "" || phone === undefined) return false;
    else return true;
  }
};

const validateDate = (dueDate) => {
  if (dueDate.length === 10) {
    return false;
  } else return true;
};

const invalidDate = (dueDate) => {
  if (
    parseInt(dueDate.slice(0, 2)) < 13 &&
    parseInt(dueDate.slice(3, 5)) < 32
    // dueDate.slice(0, 1) === "1" ||
    // dueDate.slice(0, 1) === ""
  ) {
    return false;
  }

    else return true
};

export { validateName, validatePhone, validateDate, invalidDate };
