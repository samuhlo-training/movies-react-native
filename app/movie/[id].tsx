import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import { updateDetailsCount } from "@/services/appwrite";
import { MovieDetails } from "@/types";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

// Language options for the toggle
const LANGUAGES = [
  { code: "en-US", label: "English" },
  { code: "es-ES", label: "Español" },
  { code: "fr-FR", label: "Français" },
  { code: "de-DE", label: "Deutsch" },
  { code: "it-IT", label: "Italiano" },
];

const MovieDetail = () => {
  const { id } = useLocalSearchParams();
  const [language, setLanguage] = useState("en-US");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Función para cargar los datos de la película
  const loadMovieDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const movieData = await fetchMovieDetails(id as string, language);
      setMovie(movieData);
      
      // Update details count when movie data is loaded
      if (movieData) {
        updateDetailsCount(movieData.id, movieData).catch(console.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }, [id, language]);

  // Cargar datos iniciales
  useEffect(() => {
    loadMovieDetails();
  }, [loadMovieDetails]);

  // Change language and reload movie details
  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setShowLanguageDropdown(false);
    // No necesitamos llamar explícitamente a loadMovieDetails aquí
    // porque el useEffect se activará automáticamente cuando cambie el idioma
    // ya que language está en la lista de dependencias de loadMovieDetails
  };

  // Get current language label for display
  const currentLanguageLabel =
    LANGUAGES.find((lang) => lang.code === language)?.label || "English";

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  if (error) {
    return (
      <SafeAreaView className="bg-primary flex-1">
        <Text className="text-red-500">{error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          {/* Language selector button */}
          <TouchableOpacity
            onPress={() => setShowLanguageDropdown(true)}
            className="absolute top-4 right-4 bg-dark-100/80 px-3 py-2 rounded-full flex-row items-center"
          >
            <Text className="text-white font-semibold mr-1">
              {currentLanguageLabel}
            </Text>
            <Image
              source={icons.arrow}
              className="size-4 rotate-90"
              tintColor="#fff"
            />
          </TouchableOpacity>
          
          {/* Language dropdown modal */}
          <Modal
            visible={showLanguageDropdown}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowLanguageDropdown(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowLanguageDropdown(false)}
              className="flex-1 justify-center items-center bg-black/50"
            >
              <View className="bg-dark-100 rounded-xl w-[80%] overflow-hidden">
                <View className="px-4 py-3 border-b border-gray-700">
                  <Text className="text-white font-bold text-lg">Select Language</Text>
                </View>
                <FlatList
                  data={LANGUAGES}
                  keyExtractor={(item) => item.code}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleLanguageChange(item.code)}
                      className={`px-4 py-3 border-b border-gray-700 flex-row justify-between items-center ${
                        item.code === language ? "bg-accent/20" : ""
                      }`}
                    >
                      <Text className="text-white text-base">{item.label}</Text>
                      {item.code === language && (
                        <View className="bg-accent rounded-full p-1">
                          <Image
                            source={{ uri: "https://img.icons8.com/ios-filled/50/ffffff/checkmark--v1.png" }}
                            className="size-4"
                            tintColor="#fff"
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setShowLanguageDropdown(false)}
                  className="px-4 py-3 border-t border-gray-700"
                >
                  <Text className="text-accent font-semibold text-center">Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
          
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetail;
