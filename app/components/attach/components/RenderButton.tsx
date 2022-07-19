import React, { FunctionComponent } from 'react';
import DrawerItem, { DrawerItemProps } from '../../../containers/root/drawer-menu/components/DrawerItem';

const RenderButton: FunctionComponent<RenderButtonProps> = (props) => {
  const localPress = () => {
    if (props.isLoading || props.disabled) {
      return () => { }
    } else if (typeof props.onPress === 'function') {
      return props.onPress(props.optionType)
    } else {
      return () => { }
    }
  }

  return (
    <DrawerItem
      {...props}
      onPress={localPress}
    />
  );
};

interface RenderButtonProps extends DrawerItemProps {
  optionType: string;
  isLoading?: boolean;
  disabled?: boolean;
}

RenderButton.defaultProps = {

}

export default React.memo(RenderButton)