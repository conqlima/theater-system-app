import { Reservation } from "../domain/reservation";

export interface IReservationRepository {
  getReservationById(id: string): Promise<Reservation | undefined>;
  getAllReservations(): Promise<Reservation[]>;
  // createReservation(user: Reservation): Promise<Reservation>;
}