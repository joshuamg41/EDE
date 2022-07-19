import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import Input, { InputProps } from '../Input/Input';

const InputArea: FunctionComponent<InputAreaProps> = props => {
  //Rendering
  return (
    <Input
      {...props}
      containerStyle={Styles.container}
      inputContentStyle={Styles.inputContent}
      inputStyle={Styles.input}
      multiline
    />
  );
}

interface InputAreaProps extends InputProps {

}

InputArea.defaultProps = {
  numberOfLines: 4,
  maxLength: 300,
}

const Styles = StyleSheet.create({
  container: {

  },
  inputContent: {
    // alignItems: 'flex-start',
  },
  input: {
    textAlign: 'left',
    textAlignVertical: 'top',
    justifyContent: "flex-start",
  },
});

export default InputArea;