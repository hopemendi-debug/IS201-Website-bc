export interface Album {
  id: string;
  title: string;
  artist: string;
  songTitle?: string;
  songArtist?: string;
  description: string;
  imageUrl: string;
  color: string;
}

export interface Answer {
  text: string;
  albumWeights: Record<string, number>;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}
