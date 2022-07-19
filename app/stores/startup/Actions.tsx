import { createAction } from '@reduxjs/toolkit';

const Types = {
  STARTUP: 'STARTUP',
}

const Creators = {
  startup: createAction(Types.STARTUP),
}

export { Types };
export default Creators;