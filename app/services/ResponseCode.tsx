const ResponseCode: { [key: string]: any } = {
  BAD_REQUEST: {
    code: 400,
    message: 'Parametros enviados incorrectos',
  },
  CLIENT_ERROR: {
    code: 503,
    message: 'No se pudo comunicar con el servidor',
  },
  NOT_FOUND: {
    code: 404,
    message: 'Registro no encontrado',
  },
  CONNECTION_ERROR: {
    code: 600,
    message: 'Error en la conexión de internet',
  },
  NETWORK_ERROR: {
    code: 503,
    message: 'No se pudo comunicar con el servidor',
  },
  TIMEOUT_ERROR: {
    code: 504,
    message: 'Ha excedido el tiempo de respuesta',
  },
  SERVER_ERROR: {
    code: 500,
    message: 'El servidor no ha podido ser conectado, favor intentar más tarde',
  },
  NO_DATA: {
    code: 501,
    message: 'Aún no existen datos',
  },
};
export default ResponseCode;
