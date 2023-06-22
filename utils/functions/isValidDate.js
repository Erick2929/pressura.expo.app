const isValidDate = (day, month, year) => {
  // Crear un objeto Date con los valores proporcionados
  var date = new Date(year, month - 1, day);
  const today = new Date();

  // Verificar si los valores de día, mes y año son válidos
  return (
    date.getDate() === parseInt(day, 10) &&
    date.getMonth() === parseInt(month, 10) - 1 &&
    date.getFullYear() === parseInt(year, 10) &&
    date < today
  );
};

export { isValidDate };
