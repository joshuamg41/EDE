import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { IS_IOS, verticalScale } from '../../utils/StyleHelpers';

const Content: FunctionComponent<ContentPropTypes> = props => {
  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={IS_IOS ? 0 : verticalScale(-200)}
      style={[Styles.container, { backgroundColor: props.color }, props.style]}
    >
      <ScrollView
        {...props}
        style={[Styles.content]}
        contentContainerStyle={[Styles.content, props.contentContainerStyle]}
      >
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export interface ContentPropTypes extends ScrollViewProps {
  color?: string;
  children?: JSX.Element | JSX.Element[] | undefined;
}

Content.defaultProps = {
  color: 'transparent',
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    color: 'transparent',
  },
})

export default React.memo(Content);