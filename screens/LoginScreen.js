import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput, Alert, KeyboardAvoidingView, Touchable} 
from 'react-native';
import firebase from 'firebase'

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: "",
            password: "",
        }
    }

    Login = async (email, password) => {
        if (email && password) {
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email, password)
                if (response) {
                    this.props.navigation.navigate("WriteStory")
                }
            }
            catch(error) {
                switch(error.code){
                    case "auth/user-not-found":
                       Alert.alert("User does not exist")
                       break;
                    case "auth/invalid-user":
                        Alert.alert("Incorrect email or password")
                        break;
               } 
            }
        }

        else {
            Alert.alert("Enter email and password")
        }
    }

    render() {
        return(
            <KeyboardAvoidingView 
                style = {{
                    alignItems: 'center', 
                    marginTop: 100, 
                    justifyContent:'center'
                }}
            >
                <View>
                    <Text 
                        style= {{
                            textAlign: 'center', 
                            fontSize: 50,
                            marginBottom: 150
                        }}
                    >
                        Bedtime Stories
                    </Text>
                </View> 
                <View>
                    <TextInput 
                        style = {styles.loginBox} 
                        placeholder = {'abc@example.com'} 
                        keyboardType = {'email-address'} 
                        onChangeText = {(text) => {
                            this.setState({
                                emailId: text
                            })
                        }}
                    />

                    <TextInput 
                        style = {styles.loginBox} 
                        placeholder = {'Enter Password'} 
                        secureTextEntry = {true} 
                        onChangeText = {(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />
                </View>
                <View>
                    <TouchableOpacity 
                        style = {{
                            height: 60, 
                            width: 180, 
                            borderWidth: 1, 
                            marginTop: 20, 
                            paddingTop: 10, 
                            borderRadius: 30
                        }}
                        onPress = {() => {
                            this.Login(this.state.emailId, this.state.password)
                        }}    
                    >
                        <Text 
                            style = {{
                                textAlign: 'center', 
                                fontSize: 40,
                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox:{
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin:10,
        marginBottom: 30,
        paddingLeft: 10
    }
})