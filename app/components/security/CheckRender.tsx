import React, { FunctionComponent } from "react";

const CheckRender: FunctionComponent<propTypes> = ({ allowed, children, notAllowedReturn }) =>
  allowed ? children : notAllowedReturn;

interface propTypes {
  allowed?: any;
  notAllowedReturn?: any;
  children: JSX.Element | JSX.Element[] | undefined | false | string | undefined | Text;
}

CheckRender.defaultProps = {
  allowed: false,
  notAllowedReturn: null,
};

export default React.memo(CheckRender);