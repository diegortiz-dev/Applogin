import { Link } from '@react-navigation/native';
import {View,Text,Image,StyleSheet,TextInput, TouchableOpacity} from 'react-native'

export default function Login() {
    return(
        <View style= {styles.container}>
            <Image source={require('../../assets/img/1.png')} style={styles.image} />
            <Text style={styles.title}> Entre na sua conta</Text>  
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
            <TouchableOpacity style={styles.botão} onPress={() => {}}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Não tem uma conta?
                <Link href="/Register" style={styles.link}> Crie uma!</Link>
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
        marginBottom:20
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
        color:"#3d3d3dff"

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
