import React, { FunctionComponent, useRef, useState } from 'react';
import { FlatList, Modal as RNModal, RefreshControl, View } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { CameraOptions, ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import DrawerItem from '../../containers/root/drawer-menu/components/DrawerItem';
import { DocumentListItem } from '../../services/document/DocumentServiceConstants';
import { RootState } from '../../stores/AppReducers';
import DocumentListActions from '../../stores/document/list/Actions';
import { COLORS, FONTS, METRICS } from '../../themes';
import ApplicationStyles from '../../themes/ApplicationStyles';
import { localToArray } from '../../utils/ArrayUtil';
import { RefreshControlBaseProps } from '../../utils/ConstantsUtil';
import { localToNumber } from '../../utils/NumberUtil';
import { localToString } from '../../utils/StringUtil';
import { horizontalScale, moderateScale } from '../../utils/StyleHelpers';
import Button from '../button/Button';
import HorizontalLine from '../horizontal-line/HorizontalLine';
import ListEmpty from '../list-empty/ListEmpty';
import ListRender from '../list-render/ListRender';
import Loading from '../loading/Loading';
import RenderDocumentItem from '../render/document-item/RenderDocumentItem';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';
import { AttachItem, ItemProps, OptionIconName, OptionTitle } from './AttachConstants';
import Styles from './AttachStyles';
import RenderButton from './components/RenderButton';
import RenderDoc from './components/RenderDoc';
import RenderImage from './components/RenderImage';

const Attach: FunctionComponent<propTypes> = props => {
  const modalizeRef = useRef<Modalize>(null);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.signin.user?.data);
  const documentData = useSelector((state: RootState) => state.documentList.getData);
  const documentLoading = useSelector((state: RootState) => state.documentList.getLoading);
  const moreLoading = useSelector((state: RootState) => state.documentList.moreLoading);

  const getDocumentPicker = async () => {
    try {
      const res: any = await DocumentPicker.pick({
        type: documentPickerType()
      });
      handleAttach(res[0], 'DocumentPicker')
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  const getImagePicker = async (option: string) => {
    try {
      const ImagePickerOptions: ImageLibraryOptions & CameraOptions = {
        mediaType: 'photo',
        cameraType: 'back',
      }

      if (option == 'camera') {
        launchCamera(ImagePickerOptions, (res: any) => handleAttach(res, 'ImagePicker'))
      } else if (option == 'library') {
        launchImageLibrary(ImagePickerOptions, (res: any) => handleAttach(res, 'ImagePicker'))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const documentPickerType = () => {
    switch (props.validExt) {
      case 'kmz':
        return [DocumentPicker.types.allFiles]
      case 'pdf':
        return [DocumentPicker.types.pdf]
      case 'xls':
        return [
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
        ]
      default:
        return [DocumentPicker.types.allFiles]
    }
  }

  const handleAttach = (response: ImagePickerResponse & DocumentPickerResponse, library = 'ImagePicker') => {
    if (response.didCancel || response.errorCode || response.copyError) {
      console.log(response)
      return () => { }
    } else if (localToNumber(response?.size) > 63950000) {
      //@ts-ignore
      alert("La imagen seleccionada no puede ser mayor a 64mb");
      return
    }

    if (props.validExt == 'kmz' && response.type != 'application/vnd.google-earth.kmz') {
      //@ts-ignore
      alert("El archivo seleccionado no es de tipo KMZ");
      return
    }

    modalizeRef.current?.close()
    if (library == 'ImagePicker') {
      addAttach({ ...response?.assets?.[0], library, name: props.title == 'Subir documentos' ? response?.assets?.[0]?.fileName : props.title, newFile: 1 })
    } else {
      addAttach({ ...response, library, newFile: 1 })
    }
  }

  const addAttach = (request: any) => {
    const result: object[] = [...(props.value || []), request]
    props.onValueChange(result)
  }

  const removeAttach = (position: number) => {
    const result: object[] = [...(props.value || [])].filter((doc, index) => index !== position)
    props.onValueChange(result)
  }

  const sheetPress = (key: string) => {
    switch (key) {
      case 'camera':
        getImagePicker('camera')
        return
      case 'library':
        getImagePicker('library')
        return
      case 'document':
        getDocumentPicker()
        return
      case 'myDocument':
        getDocumentList()
        setIsVisible(true)
        return
      default:
        return () => { }
    }
  }

  const getDocumentList = () => {
    if (localToArray(documentData?.[0]?.data).length) {
      return
    }
    const request = {
      citizen_id: userData?.citizen_id,
      origin: 0,
    }
    dispatch(DocumentListActions.getDocumentList(request))
  }

  const loadMore = () => {
    if (documentLoading ||
      moreLoading ||
      //@ts-ignore
      (documentData?.[0]?.current_page == documentData?.[0]?.last_page)) {
      return
    }
    const request = {
      body: {
        status: 1,
        type: 1,
        //@ts-ignore
        page: localToNumber(documentData?.[0]?.current_page) + 1,
      },
      citizen_id: userData?.citizen_id,
      origin: 0,
    }
    dispatch(DocumentListActions.getMoreDocument(request))
  }

  const addServerFile = (itemProps: any) => {
    setIsVisible(false)
    modalizeRef.current?.close()
    const _itemProps = {
      ...itemProps,
      newFile: 0,
      library: 'MyDocument',
      key: String(itemProps?.route),
      uri: itemProps?.url,
    }
    const result: object[] = [...(props.value || []), _itemProps]
    props.onValueChange(result)
  }

  //Rendering
  const RenderAttach = (item: ItemProps) => {
    const _item = item.item
    switch (_item.library) {
      case 'DocumentPicker':
        return (
          <RenderDoc
            index={item.index}
            item={_item}
            key={String(item.index)}
            removeAttach={() => removeAttach(item.index)}
            extension={_item?.type}
          />
        )
      case 'ImagePicker':
        return (
          <RenderImage
            index={item.index}
            item={_item}
            key={String(item.index)}
            removeAttach={() => removeAttach(item.index)}
          />
        )
      case 'MyDocument':
        return (
          <>
            <CheckRender allowed={_item?.extension == 'pdf'}>
              <RenderDoc
                index={item.index}
                item={_item}
                key={String(item.index)}
                removeAttach={() => removeAttach(item.index)}
                extension={_item?.extension}
              />
            </CheckRender>
            <CheckRender allowed={_item?.extension != 'pdf'}>
              <RenderImage
                index={item.index}
                item={_item}
                key={String(item.index)}
                removeAttach={() => removeAttach(item.index)}
              />
            </CheckRender>
          </>
        )
      default:
        return (<View />)
    }
  }

  const filterArray = (s: string) => {
    //'camera' | 'library' | 'document' | 'myDocument'
    switch (props.validExt) {
      case 'kmz':
      case 'pdf':
      case 'xls':
        return ['document', 'myDocument'].includes(s)
      case 'jpeg':
      case 'png':
        return ['camera', 'library', 'myDocument'].includes(s)
      default:
        return true
    }
  }

  const filterMyDocs = (o: DocumentListItem) => {
    switch (props.validExt) {
      case null:
      case undefined:
        return true
      case 'jpeg':
      case 'png':
        //@ts-ignore
        return ['jpeg', 'png'].includes(o.extension)
      case 'xls':
        //@ts-ignore
        return ['xls', 'xlsx', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(o.extension)
      default:
        return o.extension == props.validExt
    }
  }

  const LocalRenderButton = ({ item, index }: { item: any, index: number }) => {
    return (
      <RenderButton
        optionType={localToString(item)}
        name={OptionTitle[item]}
        iconName={OptionIconName[item]}
        onPress={sheetPress}
      />
    )
  }

  const LocalRenderDocumentItem = ({ item, index }: { item: any, index: number }) => {
    return (
      <RenderDocumentItem
        item={item}
        index={index}
        onPress={addServerFile}
      />
    )
  }

  return (
    <View style={Styles.container}>
      <CheckRender allowed={props.showTitle}>
        <Text style={[
          Styles.title, {
            paddingHorizontal: props.widthSeparator && moderateScale(props.widthSeparator) || 0
          }]}
        >
          {props.title}
        </Text>
        <Separator height={METRICS.medium10} />
      </CheckRender>
      <CheckRender allowed={props.value && props.value?.length > 0}>
        <FlatList
          data={localToArray(props.value)}
          renderItem={RenderAttach}
          horizontal
          ItemSeparatorComponent={Separator}
          contentContainerStyle={ApplicationStyles.hPLarge}
          showsHorizontalScrollIndicator={false}
        />
        <Separator />
      </CheckRender>
      <CheckRender allowed={props.showButton}>
        <Button
          title={props.buttonTitle || ''}
          onPress={() => modalizeRef.current?.open()}
          children={props.buttonIcon}
          theme={props.showError ? 'errorOutline' : props.buttonTheme}
          widthSeparator={props.widthSeparator}
        />
      </CheckRender>
      <Portal>
        <Modalize
          ref={modalizeRef}
          handlePosition='inside'
          handleStyle={Styles.handleStyle}
          adjustToContentHeight
        >
          <View style={Styles.modalizeContent}>
            <Text style={Styles.modalizeTitle}>{props.title}</Text>
            <ListRender
              data={localToArray(props?.options).filter(filterArray)}
              renderItem={LocalRenderButton}
            />
            <HorizontalLine marginHorizontal={0} />
            <DrawerItem
              onPress={() => modalizeRef.current?.close()}
              name="Cerrar"
              textStyle={Styles.closeDrawer}
              leftSpace={false}
            />
          </View>
        </Modalize>
      </Portal>
      <RNModal
        {...props}
        visible={!!isVisible}
        transparent={true}
        animationType={"fade"}
      >
        <View style={Styles.documentContainer}>
          <FlatList
            data={localToArray(documentData?.[0]?.data).filter(filterMyDocs)}
            renderItem={LocalRenderDocumentItem}
            onEndReachedThreshold={0.5}
            onEndReached={loadMore}
            ListEmptyComponent={<ListEmpty isLoading={documentLoading} errorText='Aún no existen documentos' />}
            contentContainerStyle={Styles.documentInnerContent}
            refreshControl={
              <RefreshControl
                {...RefreshControlBaseProps}
                refreshing={documentLoading}
                onRefresh={getDocumentList}
                progressViewOffset={0}
              />
            }
            ListHeaderComponent={
              <View style={[ApplicationStyles.row, ApplicationStyles.hPLarge]}>
                <Text style={Styles.documentTitle}>Mis Documentos</Text>
                <Ionicons
                  name='close'
                  size={FONTS.mediumIcon}
                  onPress={() => setIsVisible(false)}
                  color={COLORS.gray}
                />
              </View>
            }
            ListFooterComponent={
              <>
                <Loading
                  isLoading={moreLoading}
                  color={COLORS.primary}
                  bottomSeparate={true}
                />
                <Button
                  title='Cancelar'
                  theme='primaryOutline'
                  onPress={() => setIsVisible(false)}
                  bottomSeparate={false}
                />
              </>
            }
          />
        </View>
      </RNModal>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </View>
  )
}

interface propTypes {
  value?: AttachItem[];
  onValueChange: (response: any | object) => void;
  title?: string;
  buttonTitle?: string;
  showButton?: boolean;
  showError?: string | boolean;
  actionTitle?: string;
  buttonIcon?: JSX.Element | JSX.Element[] | undefined;
  children?: JSX.Element | JSX.Element[] | undefined;
  options?: ('camera' | 'library' | 'document' | 'myDocument')[]
  bottomSeparate?: boolean;
  buttonTheme?: "primary" | "primaryOutline" | "secondary" | "grayPlain" | "plain" | "tertiaryOutline" | "tertiary";
  validExt?: null | 'pdf' | 'png' | 'jpeg' | 'kmz' | 'xls';
  widthSeparator?: number;
  showTitle?: boolean;
}

Attach.defaultProps = {
  value: [],
  onValueChange: (response) => console.log(response),
  title: 'Subir documentos',
  buttonTitle: 'Adjuntar',
  showButton: true,
  buttonIcon: undefined,
  options: ['camera', 'library'],
  bottomSeparate: true,
  widthSeparator: horizontalScale(METRICS.large15),
  showTitle: false,
}

export default Attach;