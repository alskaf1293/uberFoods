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
            selected: null,
            selectFoods: false,
            checkout: false,
        }
    }
    addItem(kek){
        const {shoppingcart} = this.state
        shoppingcart.push(kek)
        this.setState({shoppingcart: shoppingcart})
    }
    
    renderPlusButton(kek){
        if(this.state.selectFoods){
            return(
                <TouchableHighlight style={{backgroundColor: '#00FF00',}} onPress={()=> this.addItem(kek)}>
                    <Text>+</Text>
                </TouchableHighlight>
            );
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
                                <Text>{name}  ${price} {this.renderPlusButton(kek)}</Text>
                            </View>
                        );
                    })}
                    <Text>{"\n\n\n"}</Text>
                    <TouchableHighlight style={styles.buyButton} onPress={()=>{this.setState({selectFoods: true})}}>
                        <Text>Buy</Text>
                    </TouchableHighlight>
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
    
    renderCheckoutButton(){
        return(
            <View style={styles.checkoutButton}>
                <TouchableHighlight onPress={()=>{this.setState({checkout: true})}}><Text>Checkout</Text></TouchableHighlight>
            </View>
        );
    }
    
    renderShoppingCart(){
        const {shoppingcart, checkout} = this.state
        if(checkout){
            return(
                <Text style={styles.checkoutText}>Your Order Will Be On Your Way!</Text>
            );
        }
        else if(shoppingcart.length === 0){
            return( <Text>Nothing added to cart yet!</Text>);
        }
        else{
            return(
                <View>
                    <Text style={styles.header}>Items in Cart</Text>
                    <Text>{"\n\n\n"}</Text>
                    {shoppingcart.map(item =>{
                        const name = item.name
                        const price = item.price
                        const url = item.url
                        return(
                            <View>
                                <Image source={url}/>
                                <Text>{name}  ${price}</Text>
                            </View>
                        );
                    })}
                    <Text>{"\n\n\n"}</Text>
                    {this.renderCheckoutButton()}
                </View>
            );
        }
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
                        {this.renderShoppingCart()}
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
                        <TouchableHighlight onPress={()=>{this.setState({screen: "Home", selected: null, selectFoods: false, checkout: false})}} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Home
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>{this.setState({screen: "Discover", selected: null, selectFoods: false, checkout: false})}} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Discover
                            </Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight onPress={()=>{this.setState({screen: "Delivery", selected: null, selectFoods: false, checkout: false})}} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Delivery
                            </Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight onPress={()=>{this.setState({screen: "Account", selected: null, selectFoods: false, checkout: false})}} style={styles.navButton}>
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
    buyButton:{
        height: 20,
        width: deviceHeight/3,
        backgroundColor: '#00FF00',
        textAlign: 'center',
        left: deviceWidth/2 - deviceHeight/6
    },
    checkoutButton:{
        height: 20,
        width: deviceHeight/3,
        backgroundColor: '#00FF00',
        textAlign: 'center',
        left: deviceWidth/2 - deviceHeight/6
    },
    checkoutText:{
        height: 10,
        textAlign: 'center',
        fontWeight: 'bold',
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