import {View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Button from '../../button/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../../themes';

const ModalMap = props => {
  const [showModalMap, setModalMap] = useState(false);

  return (
    <View>
      <Button
        title="Cordenadas"
        theme="secondary"
        onPress={() => setModalMap(true)}
      />
      <Modal style={Styles.flex} visible={showModalMap} transparent={false}>
        <View>
          <TouchableOpacity style={Styles.close}>
            <Ionicons
              name="close-circle"
              size={FONTS.mediumIcon}
              onPress={() => {
                setModalMap(false);
              }}
              color={COLORS.gray}
            />
          </TouchableOpacity>
          <MapView
            style={Styles.map}
            initialRegion={{
              latitude: props.origin.latitude,
              longitude: props.origin.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            }}>
            <Marker
              draggable
              coordinate={props.origin}
              onDragEnd={direccion => {
                props.onValueChange(
                  'linkdecoordenad',
                  direccion.nativeEvent.coordinate.latitude +
                    ' ' +
                    direccion.nativeEvent.coordinate.longitude,
                );
                props.onValueChange(
                  'latitud',
                  direccion.nativeEvent.coordinate.latitude,
                );
                props.onValueChange(
                  'longitud',
                  direccion.nativeEvent.coordinate.longitude,
                );
              }}
            />
          </MapView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalMap;

const Styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 1,
  },
});
