import React from 'react';
import { StyleSheet, Text, View, Header, TextInput, TouchableOpacity,
         KeyboardAvoidingView, ToastAndroid, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import db from '../config';
import firebase from 'firebase'
import { createPortal } from 'react-dom';

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      searchText: "",
      allStories: [],
      display: []
    }
  }

  componentDidMount = async () => {
    const query = await db.collection('stories').get()
    query.docs.map((doc) => {
      this.setState({
        allStories: [...this.state.allStories,doc.data()],
        display: [...this.state.allStories,doc.data()],
      })
    })
  }

  searchStories = async(text) =>{
    
  }

  render() {
    return (
      <View style = {styles.container}>
        <SearchBar
          placeholder="Search"
          onChangeText={(text) => {
            this.setState({ 
              searchText: text
            });
            this.searchStories(this.state.searchText)
          }}
          value={this.state.searchText}
        />
        <FlatList
          style = {styles.scrollView}
          data={this.state.display}
          renderItem={({item})=>(
            <View style = {styles.view}>
              <Text>{"Title: " + item.Title}</Text>
              <Text>{"Author: " + item.Author}</Text>
            </View>
          )}
        /> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    borderBottomWidth: 2,
  },
  container: {
    marginTop: 50, 
    padding: 3
  },
  scrollView:{
    marginTop: 10,
    padding: 10
  }
})