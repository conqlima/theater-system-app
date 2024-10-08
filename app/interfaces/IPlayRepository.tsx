import { Play } from "../domain/play";

export interface IPlayRepository {
  getPlayById(id: string): Promise<Play | undefined>;
  getAllPlays(): Promise<Play[]>;
  // createReservation(user: Reservation): Promise<Reservation>;
}