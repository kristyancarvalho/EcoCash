import { 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    deleteDoc,
    query,
    where,
    getDocs,
    collection,
    Timestamp
  } from 'firebase/firestore';
  import { db } from './config';
  
  export interface User {
    id?: string;
    nome: string;
    ra: string;
    dataNascimento: Date | string | Timestamp;
    turma: string;
    pontosAtuais: number;
    pontosAdquiridos: number;
  }
  
  export const createUser = async (userId: string, userData: Omit<User, 'id'>) => {
    try {
      let birthDate: Date;
      if (userData.dataNascimento instanceof Date) {
        birthDate = userData.dataNascimento;
      } else if (userData.dataNascimento instanceof Timestamp) {
        birthDate = userData.dataNascimento.toDate();
      } else {
        birthDate = new Date(userData.dataNascimento);
      }
      
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        dataNascimento: birthDate,
        pontosAtuais: 0,
        pontosAdquiridos: 0
      });
      return true;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  };
  
  export const getUserById = async (userId: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.exists() 
        ? { 
            id: userDoc.id, 
            ...userDoc.data() 
          } as User 
        : null;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  };
  
  export const updateUser = async (userId: string, updates: Partial<User>) => {
    try {
      await updateDoc(doc(db, 'users', userId), updates);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  };
  
  export const deleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  };
  
  export const getUserByRA = async (ra: string): Promise<User | null> => {
    try {
      const q = query(collection(db, 'users'), where('ra', '==', ra));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return { 
          id: userDoc.id, 
          ...userDoc.data() 
        } as User;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar usuário por RA:', error);
      throw error;
    }
  };
  
  export const incrementPoints = async (userId: string, points: number) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        await updateDoc(userRef, {
          pontosAtuais: userData.pontosAtuais + points,
          pontosAdquiridos: userData.pontosAdquiridos + points
        });
      }
    } catch (error) {
      console.error('Erro ao incrementar pontos:', error);
      throw error;
    }
  };