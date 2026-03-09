import {View,Text,Image,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = { Login: undefined; Register: undefined };
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    return(
        <View style= {styles.container}>
            <Image source={require('../../assets/img/1.png')} style={styles.image} />
            <Text style={styles.title}> Retorne à sua alma, Guerreiro</Text>  
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
            <TouchableOpacity style={styles.botão} onPress={() => {}}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Não tem uma conta?
                <TouchableOpacity onPress={() =>navigation.navigate('Register')}>
                    <Text style={styles.link}> Crie uma!</Text>
                </TouchableOpacity>
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
        marginBottom:20,
        textAlign: 'center',
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 10,
        marginTop: 0,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    input:{
        width:300,
        borderColor:"#3d3d3dff",
        borderWidth:4,
        height:50,
        marginBottom:20,
        color:"#3d3d3dff",
        fontFamily: 'Sans-serif',
        fontSize: 16,
        borderRadius: 10,

    },
    botão: {
        backgroundColor: "#3d3d3dff",
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        width: 300,
    },
    buttonText: {
        color: "#ffffff"
    },
    link: {
        color: "#07557eff",
        fontWeight: 'bold',
    }
});
