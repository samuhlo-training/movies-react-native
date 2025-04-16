import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { signUp } from "@/services/auth";
import { icons } from "@/constants/icons";

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validaciones básicas
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name);
      onSuccess();
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.message ||
        "No se pudo completar el registro. Inténtalo nuevamente.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 w-full"
      keyboardVerticalOffset={50}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          className="flex-1 w-full"
        >
          <View className="w-full space-y-5">
            <View className="items-center">
              <Image
                source={icons.logo}
                className="w-[70%] h-20 mb-10"
                resizeMode="contain"
              />
            </View>

            <Text className="text-white text-2xl font-bold text-center mb-5">
              Crear nueva cuenta
            </Text>

            <View>
              <Text className="text-gray-400 text-sm mb-1">Nombre</Text>
              <TextInput
                className="bg-[#1A1A1A] border border-gray-800 p-4 rounded-xl text-white mb-4"
                placeholder="Introduce tu nombre"
                placeholderTextColor="#505050"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View>
              <Text className="text-gray-400 text-sm mb-1">Email</Text>
              <TextInput
                className="bg-[#1A1A1A] border border-gray-800 p-4 rounded-xl text-white mb-4"
                placeholder="Introduce tu email"
                placeholderTextColor="#505050"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View>
              <Text className="text-gray-400 text-sm mb-1">Contraseña</Text>
              <TextInput
                className="bg-[#1A1A1A] border border-gray-800 p-4 rounded-xl text-white mb-4"
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor="#505050"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View>
              <Text className="text-gray-400 text-sm mb-1">
                Confirmar Contraseña
              </Text>
              <TextInput
                className="bg-[#1A1A1A] border border-gray-800 p-4 rounded-xl text-white"
                placeholder="Repite tu contraseña"
                placeholderTextColor="#505050"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity
              className="bg-accent py-4 rounded-xl mt-4"
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-center text-base">
                  Crear Cuenta
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={onSwitchToLogin} className="mt-4">
              <Text className="text-gray-400 text-center">
                ¿Ya tienes una cuenta?{" "}
                <Text className="text-accent font-semibold">
                  Iniciar sesión
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterForm;
