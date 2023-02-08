import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
} from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import {
    FontAwesome,
    Feather
} from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const LoginSceen = ({ navigation }) => {
    const { colors } = useTheme();
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
      });
      
    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length > 6 && val.trim().length <= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else if (val.trim().length < 6 && val.trim().length != 0) {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
        else {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#1F656D' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>ลงทะเบียน</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>อีเมล</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="example@gmail.com"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text,
                            textAlignVertical: "bottom"
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>รูปแบบอีเมลไม่ถูกต้อง</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>รหัสผ่าน</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        maxLength={8}
                        placeholder="กรอกรหัสผ่าน"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text,
                            textAlignVertical: "bottom",
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>รหัสผ่านต้องมีความยาว 8 อักขระ.</Text>
                    </Animatable.View>
                }

                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MainPage')}
                        style={[styles.signIn, {
                            backgroundColor: '#1F656D',
                            borderColor: '#009387',
                            borderWidth: 1,
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#FFFFFF'
                        }]}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <View style={{
                            flex: 0.3,
                            borderWidth: 1,
                            alignSelf: "center",
                            borderColor: '#1F656D',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }} />
                        <Text style={{ color: '#333333', textAlign: 'center', fontWeight: 'bold', flex: 0.2 }}>หรือ</Text>
                        <View style={{
                            flex: 0.3,
                            borderWidth: 1,
                            alignSelf: "center",
                            borderColor: '#1F656D',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }} />
                    </View>


                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome5 name="facebook" size={24} color="#395185" />
                            <Text style={[styles.textSign, {
                                marginStart: 5,
                                color: '#009387'
                            }]}>ดำเนินการต่อด้วย Facebook</Text>
                        </View>

                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#333333', fontWeight: 'bold', marginTop: 15 }}>ไม่มีบัญชี?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ChooseAccount')}>
                            <Text style={{ color: '#0354A6', fontWeight: 'bold', marginTop: 15 }}>สร้างบัญชี</Text>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity>
                        <Text style={{ color: '#0354A6', fontWeight: 'bold', marginTop: 15 }}>ลืมรหัสผ่านใช่หรือไม่</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F656D'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default LoginSceen