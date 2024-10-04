import { Reservation } from "../domain/reservation";

export interface IReservationRepository {
  getReservationById(id: string): Promise<Reservation | null>;
  getAllReservations(): Promise<Reservation[]>;
  // createReservation(user: Reservation): Promise<Reservation>;
}