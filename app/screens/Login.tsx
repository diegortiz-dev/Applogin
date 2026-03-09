import {View,Text,Image,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { loginPersonagem } from '../src/storage';

type RootStackParamList = { Login: undefined; Register: undefined, Home: { id: string } };
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        const personagem = await loginPersonagem(email, password);

        if (personagem) {
            Alert.alert('Sucesso', `Bem-vindo, ${personagem.name}!`);
            navigation.navigate('Home',{ id: personagem.id });
        } else {
            Alert.alert('Erro', 'Email ou senha incorretos');
        }
    }

    return(
        <View style= {styles.container}>
            <Image source={require('../../assets/img/1.png')} style={styles.image} />
            <Text style={styles.title}> Retorne à sua alma, Guerreiro</Text>  
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} value={password} onChangeText={setPassword} />
            <TouchableOpacity style={styles.botão} onPress={handleLogin}>
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
