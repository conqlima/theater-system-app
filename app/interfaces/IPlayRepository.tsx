import { Play } from "../domain/play";

export interface IPlayRepository {
  getPlayById(id: string): Promise<Play | null>;
  getAllPlays(): Promise<Play[]>;
  // createReservation(user: Reservation): Promise<Reservation>;
}