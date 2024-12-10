import { Play } from "../../domain/play";

export interface IPlayRepository {
  getPlayById(id: string): Promise<Play | undefined>;
  getAllPlays(): Promise<Play[]>;
  createPlay(play: Play): Promise<Play>;
}