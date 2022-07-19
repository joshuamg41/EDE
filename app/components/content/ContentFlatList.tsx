import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareFlatList, KeyboardAwareFlatListProps } from '@codler/react-native-keyboard-aware-scroll-view';
import Separator from '../separator/Separator';

const ContentFlatList: FunctionComponent<ContentFlatListProps> = props => {
  return (
    <KeyboardAwareFlatList
      {...props}
      contentContainerStyle={[Styles.container, props.contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    />
  )
};

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})

interface ItemT { }

export interface ContentFlatListProps extends KeyboardAwareFlatListProps<ItemT> {
  
}

const defaultProps = {
  ListHeaderComponent: <Separator />,
  ListFooterComponent: <Separator />,
  ItemSeparatorComponent: Separator,
}

ContentFlatList.defaultProps = defaultProps;

export default ContentFlatList