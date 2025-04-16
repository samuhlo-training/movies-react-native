import { icons } from "@/constants/icons";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from 'react';
import { getCurrentUser, User } from "@/services/auth";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ProfileInfo from "@/components/auth/ProfileInfo";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error al verificar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    checkUserSession();
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-10">
        <View className="flex justify-center items-center flex-1">
          <ActivityIndicator size="large" color="#E21A20" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1 px-5">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        {!user ? (
          <>
            {showRegister ? (
              <RegisterForm 
                onSuccess={handleAuthSuccess} 
                onSwitchToLogin={() => setShowRegister(false)} 
              />
            ) : (
              <LoginForm 
                onSuccess={handleAuthSuccess} 
                onSwitchToRegister={() => setShowRegister(true)} 
              />
            )}
          </>
        ) : (
          <ProfileInfo user={user} onLogout={handleLogout} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
