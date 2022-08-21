import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import one from '../Images/1.jpg';
import two from '../Images/2.jpg';
import three from '../Images/3.jpg';
import four from '../Images/4.jpg';
import five from '../Images/5.jpg';
import six from '../Images/6.jpg';
import seven from '../Images/7.jpg';

const  images = [one, two, three, four, five, six, seven]

const Home = () => {
    const [city, setCity] = useState('cairo')
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [randomImage, setRandomImage] = useState(images[0])

    useEffect(()=> {
        getWeather()
    },[])

    const getWeather = async () => {
        if (!city.trim()) return;
        setIsLoading(true)
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=713da2e24c573d0faf0e89410d2a43e9`)
            setData(res.data)
            const rdm = Math.floor(Math.random() * (images.length))
            setRandomImage(images[rdm])
            setIsLoading(false)
        } catch (err) {
            Alert.alert("Wrong City Name, make sure!")
            setIsLoading(false)
        }
    }

    return (
        <ImageBackground
            source={randomImage}
            style={styles.img}
            imageStyle={{opacity: 0.6}}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <TextInput
                        style={styles.input}
                        value={city}
                        placeholder="Enter your City"
                        onChangeText={(value) => setCity(value)}
                    />
                </View>
                    <Pressable
                        style={styles.press}
                        onPress={getWeather}
                    >
                        {
                            isLoading
                            ?
                            <ActivityIndicator size="large" color="#f0f"/>
                            :
                            <Text style={styles.pressText}>Ok</Text>
                        }
                    </Pressable>
                {
                    Object.keys(data).length > 0 ?
                        <>
                            <View style={styles.location}>
                                <Text style={styles.locationText}>
                                    {data?.name} , {data?.sys?.country}
                                </Text>
                            </View>
                            <View style={styles.weatherInfo}>
                                <Text style={styles.weatherTemp}>
                                    {`${(data?.main?.temp - 273).toPrecision(4)} ℃`}
                                </Text>
                                <Text style={styles.weatherState}>
                                    {data?.weather[0]?.main}
                                </Text>
                            </View>
                        </>
                        :
                        null
                }
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    img: {
        flex: 1,
    },
    input: {
        width: '85%',
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#00f',
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 10,
        textDecorationStyle: 'none',
        color: '#00f',
    },
    press: {
        width: "50%",
        height: 65,
        backgroundColor: '#00f',
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressText: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        color: '#fff'
    },
    location: {
        marginVertical: 15
    },
    locationText: {
        marginVertical: 5,
        color: '#fff',
        fontSize: 55,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.55)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,

    },
    weatherInfo: {
        alignItems: 'center'
    },
    weatherTemp: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 80,
        fontWeight: 'bold',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 25,
        overflow: 'hidden',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 10,
    },
    weatherState: {
        marginTop: 20,
        color: "#fff",
        fontSize: 50,
        fontWeight: '700',
        shadowColor: "#000",
        shadowOffset: {
            width: -1,
            height: 3
        },
        shadowOpacity: 0.7,
    },
})