import React, { Component } from 'react';
import { TextInput, Image, Text, View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            saved: {
                "First Name": 'Natalie',
                "Last Name": 'Kim',
                "Phone Number": '123-456-7890',
                "Address": '420 CandyLand Street Omegalul City Madagascar 19320',
                "Payment Method": 'VISA',
                "Credit Card Number": '9999-9999-9999-9999',
                "CSC": '101'
            },
            settingsBuffer: {
                "First Name": 'Natalie',
                "Last Name": 'Kim',
                "Phone Number": '123-456-7890',
                "Address": '420 CandyLand Street Omegalul City Madagascar 19320',
                "Payment Method": 'VISA',
                "Credit Card Number": '9999-9999-9999-9999',
                "CSC": '101'
            },
            screen: "Home",
            shoppingcart: [],
            selected: null,
            selectFoods: false,
            checkout: false,
            savedMessage: false,
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
    
    renderHome(){
        return(
            <View>
            <Text style={styles.header}>Recommended</Text>
            {Restaraunts.map(bruv => {
                return(
                    <TouchableHighlight onPress={()=>{this.setState({selected: bruv})}}>
                        <Text style={styles.restaraunt}>{bruv.name}</Text>
                    </TouchableHighlight>
                    );   
                })}
            </View>
        );
    }
    renderScreen(){
        if((this.state.selected ===null)){
            if(this.state.screen === "Home"){
                return(
                    <View>
                        {this.renderHome()}
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
                        {this.renderAccount()}
                    </View>
                );
            }
        }
    }
    
    changeValue = (e, type) => {
        const {settingsBuffer} = this.state
        settingsBuffer[type] = e
        this.setState({settingsBuffer: settingsBuffer})
    }
    
    renderSavedMessage(){
        if(this.state.savedMessage){
            return(
                <Text style={styles.saveMessage}>Saved Successfully!</Text>    
            );
        }
    }
    
    renderAccount(){
        const {settingsBuffer} = this.state
        let firstName = settingsBuffer["First Name"]
        let lastName = settingsBuffer["Last Name"]
        let phone = settingsBuffer["Phone Number"]
        let address = settingsBuffer["Address"]
        let payMethod = settingsBuffer["Payment Method"]
        let creditCard = settingsBuffer["Credit Card Number"]
        let csc = settingsBuffer["CSC"]
        
        return(
            <View>
                <Text style={styles.accountText}>First Name:  </Text><TextInput style={styles.AccountInput} onChangeText={(e) => this.changeValue(e, "First Name")} value={firstName}/><Text>{"\n"}</Text>
                <Text style={styles.accountText}>Last Name:  </Text><TextInput style={styles.AccountInput} onChangeText={(e) => this.changeValue(e, "Last Name")} value={lastName}/><Text>{"\n"}</Text>
                <Text style={styles.accountText}>Phone Number:  </Text><TextInput style={styles.AccountInput} onChangeText={(e) => this.changeValue(e, "Phone Number")} value={phone}/><Text>{"\n"}</Text>
                <Text style={styles.accountText}>Address:  </Text><TextInput style={styles.AccountInput} onChangeText={(e) => this.changeValue(e, "Address")} value={address}/><Text>{"\n"}</Text>
                <Text style={styles.accountText}>Payment Method  </Text><TextInput style={styles.AccountInput} onChangeText={(e) => this.changeValue(e, "Payment Method")} value={payMethod}/><Text>{"\n"}</Text>
                <Text style={styles.accountText}>Credit Card Number:  </Text><TextInput style={styles.AccountInput} onChangeText={(e) => this.changeValue(e, "Credit Card Number")} value={creditCard}/><Text>{"\n"}</Text>
                <Text style={styles.accountText}>CSC:  </Text><TextInput style={styles.AccountInput} onChangeText={(e) => this.changeValue(e, "CSC")} value={csc}/><Text>{"\n\n"}</Text>
                <TouchableHighlight style={styles.saveButton} onPress={() => {
                    const {settingsBuffer} = this.state; 
                    let cops = {}
                    for(const feature in settingsBuffer){cops[feature] = settingsBuffer[feature]}
                    this.setState({saved: cops, savedMessage: true})}
                }>
                    <Text>Save</Text>
                </TouchableHighlight>
                {this.renderSavedMessage()}
            </View>    
        );
    }
    onSwitch(button){
        const {saved} = this.state
        let cops = {}
        for(const feature in saved){cops[feature] = saved[feature]}
        this.setState({screen: button, selected: null, selectFoods: false, checkout: false, savedMessage: false, settingsBuffer: cops})
    }
    
    render() {
        return (
            <View>
                <View style={styles.navbarContainer}>
                        <TouchableHighlight onPress={()=>this.onSwitch("Home")} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Home
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>this.onSwitch("Discover")} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Discover
                            </Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight onPress={()=>this.onSwitch("Delivery")} style={styles.navButton}>
                            <Text style={styles.navButtonText}>
                                Delivery
                            </Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight onPress={()=>this.onSwitch("Account")} style={styles.navButton}>
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
var Restaraunts = []

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

//after initializing every restaraunt
//takes every restaraunt in Types and appends it to Restaraunts
for(const item in Types){
    let bruh = Types[item]
    for(let i=0; i< bruh.length; i++){
        Restaraunts.push(bruh[i])
    }
}

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
    header:{
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    restaraunt:{
        fontSize: 25,
        textAlign: 'center',
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
    accountText:{
        fontWeight: 'bold',
        fontSize: 18,
    },
    accountInput:{
        fontSize: 14
    },
    saveButton:{
        fontSize: 25,
        backgroundColor: '#5DADE2',
        width: deviceHeight/4,
        height: 20,
        textAlign: 'center',
        left: deviceWidth/2 - deviceHeight/8,
    },
    saveMessage:{
        fontSize: 12,
        textAlign: 'center',
    },
    
});