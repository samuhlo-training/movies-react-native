import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { User, getDefaultAvatar, signOut } from "@/services/auth";
import { useState } from "react";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";

interface ProfileInfoProps {
  user: User;
  onLogout: () => void;
}

const ProfileInfo = ({ user, onLogout }: ProfileInfoProps) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      onLogout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Obtener avatar del usuario o usar el avatar por defecto
  const avatarUrl = user.prefs?.avatarUrl || getDefaultAvatar(user.$id);

  // Navegar a la página de favoritos
  const navigateToFavorites = () => {
    // Implementar navegación a favoritos cuando esté disponible
    // router.push('/favorites');
  };

  // Navegar a la configuración del perfil
  const navigateToSettings = () => {
    // Implementar navegación a configuración cuando esté disponible
    // router.push('/profile-settings');
  };

  return (
    <View className="w-full">
      <View className="items-center mb-6">
        <Image
          source={{ uri: avatarUrl }}
          className="w-28 h-28 rounded-full mb-4"
          resizeMode="cover"
        />
        <Text className="text-white text-2xl font-bold">{user.name}</Text>
        <Text className="text-gray-400 text-base mt-1">{user.email}</Text>
      </View>

      <View className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800 mb-6">
        <TouchableOpacity
          className="px-5 py-4 border-b border-gray-800 flex-row justify-between items-center"
          onPress={navigateToFavorites}
        >
          <View className="flex-row items-center">
            <Image
              source={icons.star}
              className="w-5 h-5 mr-3"
              tintColor="#AB8BFF"
            />
            <Text className="text-white text-base">
              Mis películas favoritas
            </Text>
          </View>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="px-5 py-4 flex-row justify-between items-center"
          onPress={navigateToSettings}
        >
          <View className="flex-row items-center">
            <Image
              source={icons.person}
              className="w-5 h-5 mr-3"
              tintColor="#AB8BFF"
            />
            <Text className="text-white text-base">Editar perfil</Text>
          </View>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-[#1A1A1A] py-4 rounded-xl border border-gray-800 mb-4"
        onPress={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <ActivityIndicator color="white" />
        ) : (
          <View className="flex-row justify-center items-center">
            <Image
              source={icons.arrow}
              className="w-5 h-5 mr-2"
              tintColor="#AB8BFF"
            />
            <Text className="text-white font-bold text-center text-base">
              Cerrar sesión
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Text className="text-gray-500 text-xs text-center mt-4">
        2025 Movies App - Creada con React Native
      </Text>
    </View>
  );
};

export default ProfileInfo;
