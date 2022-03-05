import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Color from '../../assets/colors/Color';
class SolidBgButton extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <TouchableOpacity onPress={this.props.active} style={{ marginVertical:this.props.marginV,backgroundColor: this.props.backgroundSolidColor, ...styles.background }} >
                <Text style={{ color: this.props.colorText, ...styles.textStyle }}>
                {this.props.titleButton}
                </Text>
            </TouchableOpacity>
        )
    }

}

SolidBgButton.propTypes = {
    colorText: PropTypes.string.isRequired,
    backgroundSolidColor: PropTypes.string.isRequired,
    titleButton: PropTypes.string.isRequired,
    avtive: PropTypes.func,
    marginV : PropTypes.number
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        paddingVertical:10,
        borderRadius:10,
        elevation:4,
        shadowColor:Color.DARK,
    },
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight:'bold',
    },
    
})

export default SolidBgButton