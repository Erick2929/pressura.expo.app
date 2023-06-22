const validarCorreo = (correo) => {
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regexCorreo.test(correo)) {
    return true;
  } else {
    return false;
  }
};

export { validarCorreo };
