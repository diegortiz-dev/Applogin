import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity,Alert,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { savePersonagem } from '../src/storage';


type RootStackParamList = { Login: undefined; Register: undefined , Home: { id: string } };
type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type GenderOption = 'cavaleiro' | 'amazona';
type CharClassOption = 'warrior' | 'mage';

function EmailValido(userEmail: string) {
    return /\S+@\S+\.\S+/.test(userEmail);
  }

  function Validacao(userName: string, userEmail: string, password: string, gender: GenderOption | null, charclass: CharClassOption | null): boolean {

    if (!userName || !userEmail || !password || !gender || !charclass) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return false;
    }

    if (!EmailValido(userEmail)) {
      Alert.alert('Erro', 'Digite um email válido');
      return false;
    }
    if (!gender) {
      Alert.alert('Erro', 'Selecione um gênero');
      return false;
    }
    if (!charclass) {
      Alert.alert('Erro', 'Selecione uma classe');
      return false;
    }

    return true;
  }

  function ConfirmarSenha(senha:string, senhaconfirmada:string):boolean{
    if(senha!=senhaconfirmada){
        Alert.alert("Erro", "As senhas não coincidem")
    return false;
  }

  return true;
}

export default function Register() {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [gender, setGender] = useState<GenderOption | null>(null);
    const [username, SetUserName] = useState("");
    const [email, SetEmail] = useState("");   
    const [password, SetPassword] = useState("");
    const [confirmPassword, SetConfirmPassword] = useState("");
    const [charclass, setCharclass] = useState<CharClassOption | null>(null);

    return (
        
            <ScrollView contentContainerStyle={{ padding: 2, flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.container}>
                    <Image source={require('../../assets/img/2.png')} style={styles.image} />
                    <Text style={styles.title}>Projete sua existência à nossos reinos, Andarilho</Text>
                    <TextInput value={username} onChangeText={SetUserName} style={styles.input} placeholder="Nome" />
                <TextInput value={email} onChangeText={SetEmail} style={styles.input} placeholder="Email" />
                <TextInput value={password} onChangeText={SetPassword} style={styles.input} placeholder="Senha" secureTextEntry={true} />
                <TextInput value={confirmPassword} onChangeText={SetConfirmPassword} style={styles.input} placeholder="Confirmar Senha" secureTextEntry={true} />

                <Text style={styles.genderLabel}>Selecione o seu gênero</Text>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[
                            styles.genderOption,
                            gender === 'cavaleiro' && styles.genderSelected,
                        ]}
                        onPress={() => setGender('cavaleiro')}
                    >
                        <View style={styles.radio}>
                            {gender === 'cavaleiro' && <View style={styles.radioFill} />}
                        </View>
                        <Text
                            style={[
                                styles.genderText,
                                gender === 'cavaleiro' && styles.genderTextSelected,
                            ]}
                        >
                            Cavaleiro
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.genderOption,
                            gender === 'amazona' && styles.genderSelected,
                        ]}
                        onPress={() => setGender('amazona')}
                    >
                        <View style={styles.radio}>
                            {gender === 'amazona' && <View style={styles.radioFill} />}
                        </View>
                        <Text
                            style={[
                                styles.genderText,
                                gender === 'amazona' && styles.genderTextSelected,
                            ]}
                        >
                            Amazona
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.genderLabel}>Selecione sua classe</Text>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[
                            styles.genderOption,
                            charclass === 'warrior' && styles.genderSelected,
                        ]}
                        onPress={() => setCharclass('warrior')}
                    >
                        <View style={styles.radio}>
                            {charclass === 'warrior' && <View style={styles.radioFill} />}
                        </View>
                        <Text
                            style={[
                                styles.genderText,
                                charclass === 'warrior' && styles.genderTextSelected,
                            ]}
                        >
                            Guerreiro
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.genderOption,
                            charclass === 'mage' && styles.genderSelected,
                        ]}
                        onPress={() => setCharclass('mage')}
                    >
                        <View style={styles.radio}>
                            {charclass === 'mage' && <View style={styles.radioFill} />}
                        </View>
                        <Text
                            style={[
                                styles.genderText,
                                charclass === 'mage' && styles.genderTextSelected,
                            ]}
                        >
                            Mago
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.botao} onPress={() => {
                    if (Validacao(username, email,password,gender, charclass) && ConfirmarSenha(password, confirmPassword)) {
                        savePersonagem(username,email,password,gender!, charclass!).then(() => {
                            Alert.alert("Sucesso", "Personagem criado com sucesso!");

                        });
                    }
                }}>
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.text}>Já tem uma conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Faça login!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
  
    );
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
        marginBottom: 20,
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
    input: {
        width: 300,
        borderColor: '#3d3d3dff',
        borderWidth: 4,
        height: 50,
        marginBottom: 20,
        color: '#3d3d3dff',
        fontFamily: 'Sans-serif',
        fontSize: 16,
        borderRadius: 10,
    },
    genderLabel: {
        fontSize: 16,
        color: '#3d3d3dff',
        marginBottom: 8,
        alignSelf: 'center',
    },
    genderContainer: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#3d3d3dff',
        borderWidth: 4,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flex: 1,
        marginHorizontal: 4,
    },
    genderSelected: {
        backgroundColor: '#3d3d3d20',
        borderColor: '#3d3d3dff',
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3d3d3dff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    radioFill: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3d3d3dff',
    },
    genderText: {
        fontSize: 16,
        color: '#3d3d3dff',
    },
    genderTextSelected: {
        fontWeight: 'bold',
    },
    botao: {
        backgroundColor: '#3d3d3dff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        width: 300,
    },
    buttonText: {
        color: '#ffffff',
    },
    link: {
        color: '#07557eff',
        fontWeight: 'bold',
        marginBottom: 10,

    },
});
