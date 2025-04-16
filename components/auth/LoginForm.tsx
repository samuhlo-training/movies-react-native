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
import { signIn } from "@/services/auth";
import { icons } from "@/constants/icons";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validaciones básicas
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      console.log("LoginForm - Intentando iniciar sesión con:", email);
      await signIn(email, password);
      console.log("LoginForm - Inicio de sesión exitoso");
      onSuccess();
    } catch (error: any) {
      console.error("LoginForm - Error completo:", error);
      const errorMessage =
        error?.message ||
        "No se pudo iniciar sesión. Verifica tus credenciales.";
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
              Accede a tu cuenta
            </Text>

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
                className="bg-[#1A1A1A] border border-gray-800 p-4 rounded-xl text-white"
                placeholder="Introduce tu contraseña"
                placeholderTextColor="#505050"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              className="bg-accent py-4 rounded-xl mt-4"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-center text-base">
                  Iniciar Sesión
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={onSwitchToRegister} className="mt-4">
              <Text className="text-gray-400 text-center">
                ¿No tienes una cuenta?{" "}
                <Text className="text-accent font-semibold">Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
