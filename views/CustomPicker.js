import React, { Component } from 'react';
import {
    StyleSheet,
    Picker,
    View,
    Text
} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CustomPicker extends Component<Props> {
    constructor(props: Props) {
        super(props);

        // data has many objects: { label, value }
        this.state = {
            data: this.props.data || [],
            title: this.props.title || "Default picker title:",
            selectedValue: this.props.selectedValue || -1,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data,
            title: nextProps.title,
            selectedValue: nextProps.selectedValue,
        });
    }

    renderPickerData = () => {
        let pickerItems;

        pickerItems = this.state.data.map(itemData =>
            <Picker.Item
                key={itemData.value}
                style={styles.generalFontSize}
                label={itemData.label}
                value={itemData.value}
            />
        );

        return (
            <Picker
                style={[styles.pickerContainer]}
                textStyle={styles.generalFontSize}
                selectedValue={this.state.selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                    this.setState({selectedValue: itemValue});
                }}
            >
                {pickerItems}
            </Picker>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, styles.generalFontSize]}>{this.state.title}</Text>
                {this.renderPickerData()}
                <IconMaterialCommunityIcons
                    style={styles.icon}
                    name='delete-circle'
                    size={30}
                    color='red'
                    onPress={() => {}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    pickerContainer: {
        width: '55%',
        marginHorizontal: 10,
        borderBottomColor: '#841584',
        borderWidth: 1,
    },
    generalFontSize: {
        fontSize: 20
    },
    pickerItem: {

    },
    title: {
        width: '30%'
    },
    icon: {
        width: '15%'
    },
});