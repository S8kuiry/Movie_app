import { Client, Databases, Query, ID } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // 🔎 Check if this search already exists
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      // ✅ Increment count if found
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: (existingMovie.count || 0) + 1,
        }
      );
    } else {
      // ✅ Create new record with required fields
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title || movie.name || "Untitled", // <-- required field
        count: 1,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      });
    }

    console.log("✅ Search count updated for:", query);
  } catch (error) {
    console.error("❌ updateSearchCount failed:", error);
    throw error;
  }
};


export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> =>{
  try {
    const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
      Query.limit(10),
      Query.orderDesc('count'),
    ])
    return result.documents as unknown as TrendingMovie[];
    
  } catch (error) {
    console.log(error)
    return undefined
  }


}