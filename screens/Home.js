import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Banner from './Banner.js';
import Footer from './Footer.js'
import Categories from './Categories.js';

const Home = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Banner/>
                <View style = {styles.categoryContainer}>
                    <Categories/>
                </View>
            </ScrollView>

            <Footer/>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
       backgroundColor:'#000',
        flex:1
    },
    scrollView:{
        flex:1,
    },
    categoryContainer:{
        gap: 10,
        marginTop: 0,
    }
});

