import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  type DocumentData,
  type QueryConstraint,
} from 'firebase/firestore';
import { db, isConfigValid } from '@/lib/firebase';

type FirestoreResult<T> = {
  result: T | null;
  error: string | Error | null;
};

const requireDb = () => {
  if (!isConfigValid || !db) {
    throw new Error('Firebase client config is missing. Firestore is not available.');
  }

  return db;
};

export async function addData<T extends DocumentData>(
  collectionName: string,
  data: T,
): Promise<FirestoreResult<{ id: string }>> {
  try {
    const database = requireDb();
    const docRef = await addDoc(collection(database, collectionName), data);
    return { result: { id: docRef.id }, error: null };
  } catch (error) {
    return { result: null, error: error instanceof Error ? error : new Error('Failed to add data.') };
  }
}

export async function getData<T extends DocumentData>(
  collectionName: string,
  id: string,
): Promise<FirestoreResult<T>> {
  try {
    const database = requireDb();
    const docRef = doc(database, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { result: null, error: 'No such document.' };
    }

    return { result: docSnap.data() as T, error: null };
  } catch (error) {
    return { result: null, error: error instanceof Error ? error : new Error('Failed to load document.') };
  }
}

export async function getCollection<T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
): Promise<FirestoreResult<Array<T & { id: string }>>> {
  try {
    const database = requireDb();
    const collectionQuery = query(collection(database, collectionName), ...constraints);
    const querySnapshot = await getDocs(collectionQuery);
    const data = querySnapshot.docs.map((item) => ({
      id: item.id,
      ...(item.data() as T),
    }));
    return { result: data, error: null };
  } catch (error) {
    return { result: null, error: error instanceof Error ? error : new Error('Failed to load collection.') };
  }
}
