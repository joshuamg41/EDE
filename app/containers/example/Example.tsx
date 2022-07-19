import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../components/container/Container';
import Content from '../../components/content/Content';
import Header from '../../components/header/Header';
import InputSearch from '../../components/input-search/InputSearch';
import Text from '../../components/text/Text';
import { ExampleRequest } from '../../services/example/ExampleServiceConstants';
import { RootState } from '../../stores/AppReducers';
import ExampleActions from '../../stores/example/Actions';
import { MainNavigatorParamList } from '../root/navigators/MainNavigator';
import { ExampleState } from './ExampleConstants';
import Styles from './ExampleStyles';

const Example = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<ExampleState>({})

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.navigation])
  );

  useFocusEffect(
    useCallback(() => {
      //function
      return () => { }
    }, [props.route])
  );

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current) {
      console.log(props.getData)
    }
    return () => { }
  }, [props.getData])

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const doRequest = () => {
    const request: ExampleRequest = {

    }
    props.doSomething(request)
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container style={Styles.container}>
      <Header
        title='Example Component'
        leftIcon
      />
      <Content>
        <Text>Example Component</Text>
        <InputSearch
          onValueChange={onStateChange('query')}
        />
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<MainNavigatorParamList, 'Example'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.example.getData,
  getLoading: state.example.getLoading,
  getError: state.example.getError,
});

const mapDispatchToProps = {
  doSomething: ExampleActions.examplePayload,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Example)