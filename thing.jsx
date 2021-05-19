import React, { Component } from 'react';
import { Image, AppRegistry, Text, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Constants from 'expo-constants';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            screen: "Home",
            shoppingcart: [],
            selected: null
        }
    }
    renderSelected(){
        if(!(this.state.selected===null)){
            const {selected} = this.state;
            const name = selected.name
            const type = selected.type
            const foods = selected.foods
            console.log(foods)
            return(
                <View>
                    <Text style={styles.selectedRestaraunt}>{name}</Text>
                    <Text style={styles.selectedType}>{type}</Text>
                    <Text>{"\n\n\n"}</Text>
                    {foods.map(kek => {
                        const name = kek.name
                        const price = kek.price
                        const url = kek.url
                        return(
                            <View>
                                <Image source={url}/>
                                <Text>{name}  ${price}</Text>
                            </View>
                        );
                    })}
                </View>
            );
        }
    }
    renderTypes(){
        return(
            things.map(item => {
                let arr = Types[item]
                return(
                    <View>
                        <Text style={styles.header}>{item}</Text>
                        {arr.map(bruv => {
                            return(
                                    <TouchableHighlight onPress={()=>{this.setState({selected: bruv})}}>
                                        <Text style={styles.restaraunt}>{bruv.name}</Text>
                                    </TouchableHighlight>
                                    
                                );   
                            })}
                        <Text>{"\n\n\n"}</Text>
                    </View>
                    );
                })
            );
        
    }
    
    renderScreen(){
        if((this.state.selected ===null)){
            if(this.state.screen === "Home"){
                return(
                    <View>
                        bruh
                    </View>
                );
            }
            else if(this.state.screen === "Discover"){
                return(
                    <View>
                        {this.renderTypes()}
                    </View>
                );
            }
            else if(this.state.screen === "Delivery"){
                return(
                    <View>
                        bruh2
                    </View>
                );
            }
            else{
                return(
                    <View>
                        bruh3
                    </View>
                );
            }
        }
    }
    
    render() {
        return (
            <View>
                <View style={styles.navbarContainer}>
                        <TouchableHighlight onPress={()=>{this.setState({screen: "Home", selected: null})}} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Home
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.setState({screen: "Discover", selected: null})}} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Discover
                            </Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight onPress={()=>{this.setState({screen: "Delivery", selected: null})}} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Delivery
                            </Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight onPress={()=>{this.setState({screen: "Account", selected: null})}} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Account
                            </Text>
                        </TouchableHighlight>
                        
                    </View>
                <View style={styles.container}>
                    {this.renderScreen()}
                    {this.renderSelected()}
                </View>
            </View>
        );
    }
}

var things = ["Boba", "Fast Food", "Pizza"]
var Types = {
    "Boba": [],
    "Fast Food": [],
    "Pizza": [],
}

class Restaraunt {
    constructor(name, type){
        this.name = name
        this.type = type
        Types[type].push(this)
        this.foods = []
    }
    addFood(item){
        //make sure that this thing is an item
        this.foods.push(item)   
    }
}

class Item {
    constructor(name, price, url) {
        this.name = name
        this.price = price
        this.url = url
    }
    setUrl(url){
        this.url = url
    }
}

//initialize shit
//Boba
var dingTea = new Restaraunt("Ding Tea", "Boba")
dingTea.addFood(new Item("Slushie", 5, null))
dingTea.addFood(new Item("Boba", 5, null))

var goodfellows = new Restaraunt("Goodfellows", "Boba")
goodfellows.addFood(new Item("Slushie", 5, null))
goodfellows.addFood(new Item("Boba", 5, null))

var eightyFive = new Restaraunt("85", "Boba")
eightyFive.addFood(new Item("Slushie", 5, null))
eightyFive.addFood(new Item("Boba", 5, null))

//Fast Food
var mcDonalds = new Restaraunt("McDonalds", "Fast Food")
mcDonalds.addFood(new Item("Big Mac", 7, null))
mcDonalds.addFood(new Item("Quarter Pounder", 8, null))

var arbys = new Restaraunt("Arbys", "Fast Food")
arbys.addFood(new Item("Burger", 7, null))
arbys.addFood(new Item("Fries", 3, null))

var burgerKing = new Restaraunt("Burger King", "Fast Food")
burgerKing.addFood(new Item("Burger", 7, null))
burgerKing.addFood(new Item("Fries", 3, null))

//Pizza
var dominos = new Restaraunt("Dominos", "Pizza")
dominos.addFood(new Item("Pizza", 9, null))
dominos.addFood(new Item("Drink", 3, null))

var pieology = new Restaraunt("Pieology", "Pizza")
pieology.addFood(new Item("Pizza", 9, null))
pieology.addFood(new Item("Drink", 3, null))

var pizzakitchen = new Restaraunt("California Pizza Kitchen", "Pizza")
pizzakitchen.addFood(new Item("Pizza", 9, null))
pizzakitchen.addFood(new Item("Drink", 3, null))

const styles = StyleSheet.create({
    container: {
        height: deviceHeight,
        width: deviceWidth,
    },
    contentContainer: {
        height: 5*(deviceHeight/6),
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue',
    },
    navbarContainer: {
        height: deviceHeight/6,
        width: deviceWidth,
        backgroundColor: 'darkblue',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderColor: 'white',
    },
    navButton: {
        height: deviceHeight/14,
        width: deviceWidth/6,
        backgroundColor: 'white',
        borderColor: 'lightblue',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    navButtonText: {
        fontSize: deviceHeight/40,
        textAlign: 'center',
        color: 'darkblue',
    },
    selectedRestaraunt:{
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    selectedType:{
        fontSize: 25,
        textAlign: 'center',
    },
    header:{
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    restaraunt:{
        fontSize: 25,
        textAlign: 'center',
    }
});