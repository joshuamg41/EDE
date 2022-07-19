import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import { NotificationListItem } from '../../../services/notification/NotificationServiceConstants';
import { RootState } from '../../../stores/AppReducers';
import { localToArray } from '../../../utils/ArrayUtil';
import { HomeNavigatorParamList } from '../../root/navigators/flows/HomeNavigator';
import { notificationScreens } from './NotificationItemConstants';
import RenderNotification from './RenderNotification';

const NotificationItem = (props: ScreenProps) => {
  const LocalRenderNotification = ({ item, index }: { item: NotificationListItem, index: number }) => {
    return (
      <RenderNotification
        item={item}
        index={index}
      />
    )
  }

  //rendering
  return (
    <Container>
      <ContentFlatList
        data={localToArray(props.data).filter(item => item.read == notificationScreens[props.route.name])}
        //@ts-ignore
        renderItem={LocalRenderNotification}
        ListHeaderComponent={View}
        ItemSeparatorComponent={HorizontalLine}
        ListEmptyComponent={
          <ListEmpty
            errorText={notificationScreens[props.route.name] == 0 ? "Parece que ya leiste \n todas tus notificaciones." : 'No posees notificationes'}
          />
        }
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<HomeNavigatorParamList, 'NotificationItem'> {

}

const mapStateToProps = (state: RootState) => ({
  data: state.notification.getData,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(NotificationItem)