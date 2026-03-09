import {View,Text,Image,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect,useState } from 'react';
import { getPersonagem,Personagem } from '../src/storage';
import { useRoute } from '@react-navigation/native';

type RootStackParamList = { Login: undefined; Register: undefined, Home: { id: string } };
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;



export default function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const route = useRoute();
    const { id } = route.params as { id: string };
    const [personagem, setPersonagem] = useState<Personagem | null>(null);

    useEffect(() => {
        const carregarPersonagem = async () => {
            const data = await getPersonagem(id);
            setPersonagem(data);
        };
        carregarPersonagem();
    }, [id]);

    const imagem = personagem?.gender === 'amazona'
        ? require('../../assets/img/4.png')
        : require('../../assets/img/3.png');

    return(
        <View style= {styles.container}>
            <Text style={styles.title}>{`Bem vindo, Nobre guerreiro`}</Text>
             <Image source={imagem} style={styles.image} />
            <TouchableOpacity style={styles.botão} onPress={() => {navigation.navigate('Login')}}>
                <Text style={styles.buttonText}>Sair</Text>
            
            </TouchableOpacity>
            <Text>{`Seu personagem: ${personagem?.name}`}</Text>
            <Text>{`Classe: ${personagem?.charclass}`}</Text>
            <Text>{`Gênero: ${personagem?.gender}`}</Text>

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
