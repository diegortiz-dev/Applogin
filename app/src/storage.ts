import AsyncStorage from "@react-native-async-storage/async-storage";

export type Personagem = {
    name: string;
    email: string;
    password: string;
    gender: 'guerreiro' | 'amazona';
    id: string;
}

const STORAGE_KEY = 'personagens';

export async function savePersonagem(name: string, email: string, password: string, gender: 'guerreiro' | 'amazona'):Promise<Personagem> {
    try {
        const personagens = await getPersonagens();
        
        const newPersonagem: Personagem = {
            name,
            email,
            password,
            gender,
            id: Date.now().toString()
        };
        personagens.push(newPersonagem);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(personagens));
        return newPersonagem;
    } catch (error) {
        console.error("Erro ao salvar o personagem:", error);
        throw error;
    }

}

export async function getPersonagens():Promise<Personagem[]> {
    try {
        const jsonEmString = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonEmString !== null) {
            return JSON.parse(jsonEmString) as Personagem[];
        }
        return [];
    } catch (error) {
        console.error("Erro ao carregar os personagens:", error);
        return [];
    }
}
