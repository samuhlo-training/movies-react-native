import { Client, Databases, ID, Query } from "react-native-appwrite";
import { Movie, PopularMovie, MovieDetails } from "@/types";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_DETAILS_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_DETAILS_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateDetailsCount = async (movieId: number, movieDetails: MovieDetails) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_DETAILS_ID, [
      Query.equal("movie_id", movieId),
    ]);
    
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_DETAILS_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_DETAILS_ID, ID.unique(), {
        movie_id: movieId,
        title: movieDetails.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating movie details count:", error);
    throw error;
  }
};

export const getPopularMovies = async (): Promise<
  PopularMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_DETAILS_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    
    return result.documents as unknown as PopularMovie[];
  } catch (error) {
    console.error("Error getting popular movies:", error);
    return undefined;
  }
};
