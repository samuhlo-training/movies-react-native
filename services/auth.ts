import { Client, Account, ID, Avatars } from "react-native-appwrite";

// Reutilizamos la configuración del cliente de Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// Inicialización del servicio de Account
const account = new Account(client);
const avatars = new Avatars(client);

// Interfaz para el usuario
export interface User {
  $id: string;
  name: string;
  email: string;
  prefs?: {
    bio?: string;
    favoriteGenres?: string[];
    avatarUrl?: string;
  };
}

// Constantes para Debug
const DEBUG = true;

/**
 * Versión alternativa del registro usando método directo de Appwrite
 */
export const signUp = async (email: string, password: string, name: string): Promise<User> => {
  try {
    if (DEBUG) console.log("[AUTH] Intentando método alternativo de registro");
    
    // Opción 1: Usar directamente la API de Appwrite sin ID.unique()
    let response = await fetch("https://cloud.appwrite.io/v1/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!
      },
      body: JSON.stringify({
        userId: "unique()",
        email,
        password,
        name
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error al registrar usuario: ${JSON.stringify(error)}`);
    }
    
    // Convertir respuesta a JSON
    const newAccount = await response.json();
    if (DEBUG) console.log("[AUTH] Usuario creado exitosamente:", newAccount);
    
    // Iniciar sesión con las credenciales recién creadas
    await signIn(email, password);
    
    return newAccount as User;
  } catch (error) {
    console.error("[AUTH] Error al registrar usuario:", error);
    throw error;
  }
};

/**
 * Versión alternativa del inicio de sesión
 */
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    if (DEBUG) console.log("[AUTH] Método alternativo para iniciar sesión con:", email);
    
    // Opción 1: Usar directamente la API de Appwrite
    let response = await fetch("https://cloud.appwrite.io/v1/account/sessions/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error al iniciar sesión: ${JSON.stringify(error)}`);
    }
    
    // Guardar sesión y obtener los datos del usuario
    const sessionData = await response.json();
    if (DEBUG) console.log("[AUTH] Sesión creada correctamente:", sessionData);
    
    // Obtener datos del usuario actual
    response = await fetch("https://cloud.appwrite.io/v1/account", {
      headers: {
        "X-Appwrite-Project": process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
        "X-Appwrite-Session": sessionData.secret
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error al obtener usuario: ${JSON.stringify(error)}`);
    }
    
    const user = await response.json();
    if (DEBUG) console.log("[AUTH] Usuario obtenido correctamente:", user);
    
    return user as User;
  } catch (error) {
    console.error("[AUTH] Error al iniciar sesión:", error);
    throw error;
  }
};

// Función de respaldo usando el SDK si las alternativas fallan
export const signUpWithSDK = async (email: string, password: string, name: string): Promise<User> => {
  try {
    if (DEBUG) console.log("[AUTH-SDK] Intentando registrar usuario con email:", email);
    
    // 1. Crear una sesión anónima primero (esto no requiere un userId)
    await account.createAnonymousSession();
    if (DEBUG) console.log("[AUTH-SDK] Sesión anónima creada");
    
    // 2. Convertir la sesión anónima a una sesión con email
    const session = await account.createSession(email, password);
    if (DEBUG) console.log("[AUTH-SDK] Sesión de email creada:", session);
    
    // 3. Actualizar el nombre del usuario
    const updatedAccount = await account.updateName(name);
    if (DEBUG) console.log("[AUTH-SDK] Nombre actualizado:", updatedAccount);
    
    // 4. Inicializar preferencias
    await account.updatePrefs({
      bio: "",
      favoriteGenres: [],
      avatarUrl: ""
    });
    
    return updatedAccount as User;
  } catch (error) {
    console.error("[AUTH-SDK] Error al registrar usuario:", error);
    throw error;
  }
};

// Cerrar sesión
export const signOut = async (): Promise<void> => {
  try {
    if (DEBUG) console.log("[AUTH] Cerrando sesión actual");
    await account.deleteSession('current');
    if (DEBUG) console.log("[AUTH] Sesión cerrada exitosamente");
  } catch (error) {
    console.error("[AUTH] Error al cerrar sesión:", error);
    throw error;
  }
};

// Obtener usuario actual
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    if (DEBUG) console.log("[AUTH] Verificando usuario actual");
    // Intentar obtener el usuario actual
    const user = await account.get();
    if (DEBUG) console.log("[AUTH] Usuario actual encontrado, ID:", user.$id);
    return user as User;
  } catch (error) {
    // Si hay un error, probablemente no hay sesión activa
    console.log("[AUTH] No hay sesión activa o error al obtener usuario:", error);
    return null;
  }
};

// Actualizar nombre de usuario
export const updateName = async (name: string): Promise<User> => {
  try {
    if (DEBUG) console.log("[AUTH] Actualizando nombre a:", name);
    const user = await account.updateName(name);
    if (DEBUG) console.log("[AUTH] Nombre actualizado exitosamente");
    return user as User;
  } catch (error) {
    console.error("[AUTH] Error al actualizar nombre:", error);
    throw error;
  }
};

// Actualizar preferencias del usuario
export const updatePreferences = async (prefs: object): Promise<User> => {
  try {
    if (DEBUG) console.log("[AUTH] Actualizando preferencias del usuario");
    const user = await account.updatePrefs(prefs);
    if (DEBUG) console.log("[AUTH] Preferencias actualizadas exitosamente");
    return user as User;
  } catch (error) {
    console.error("[AUTH] Error al actualizar preferencias:", error);
    throw error;
  }
};

// Obtener URL de avatar por defecto
export const getDefaultAvatar = (userId: string): string => {
  return avatars.getInitials(userId).href;
};
