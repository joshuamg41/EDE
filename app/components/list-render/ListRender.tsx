import React, { FunctionComponent } from 'react';
import { View } from "react-native";
import { localToArray } from '../../utils/ArrayUtil';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';

const ListRender: FunctionComponent<ListRenderProps> = props => {
  const renderArray: Element[] = []
  const RenderItem = props.renderItem
  const ItemSeparatorComponent = props.ItemSeparatorComponent

  if (localToArray(props.data).length == 0) {
    return null
  }

  for (let index = 0; index < props.data.length; index++) {
    renderArray.push(
      <View key={props.data[index]?.key || String(index)}>
        {/* <RenderItem
          index={index}
          item={props.data[index]}
        /> */}
        {RenderItem({ item: props.data[index], index })}
        <CheckRender allowed={props.renderSeparator && (index + 1) < props.data.length}>
          {/* @ts-ignore */}
          {!!ItemSeparatorComponent && ItemSeparatorComponent}
        </CheckRender>
      </View>
    )
  }

  return (
    <View>
      {renderArray}
    </View>
  )
};

interface ListRenderProps {
  renderItem: FunctionComponent<any>;
  data: any[];
  ItemSeparatorComponent?: Element;
  renderSeparator?: boolean;
}

const defaultProps = {
  data: [],
  ItemSeparatorComponent: Separator,
}

ListRender.defaultProps = defaultProps;

export default React.memo(ListRender);