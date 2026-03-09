import AsyncStorage from "@react-native-async-storage/async-storage";

export type Personagem = {
    name: string;
    email: string;
    password: string;
    gender: 'cavaleiro' | 'amazona';
    id: string;
    charclass: 'warrior' | 'mage';
}

const STORAGE_KEY = 'personagens';

export async function savePersonagem(name: string, email: string, password: string, gender: 'cavaleiro' | 'amazona', charclass: 'warrior' | 'mage'):Promise<Personagem> {
    try {
        const personagens = await loadPersonagens();
        
        const newPersonagem: Personagem = {
            name,
            email,
            password,
            gender,
            charclass,
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

export async function loadPersonagens():Promise<Personagem[]> {
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

export async function loginPersonagem(email: string, password: string): Promise<Personagem | null> {
    try {
        const personagens = await loadPersonagens();
        const encontrado = personagens.find(
            (personagem) => personagem.email === email && personagem.password === password
        );
        return encontrado || null;
    } catch (error) {
        console.error("Erro ao verificar login:", error);
        return null;
    }
}
export async function getPersonagem(id: string): Promise<Personagem | null> {
    try {
        const personagens = await loadPersonagens();
        const encontrado = personagens.find((personagem) => personagem.id === id);
        return encontrado || null;
    } catch (error) {
        console.error("Erro ao obter personagem:", error);
        return null;
    }
}
