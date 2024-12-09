import { Play } from "@/domain/play";
import { IPlayRepository } from "./interfaces/IPlayRepository";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();

const dates = [
    "2024-10-11T16:30:00.000-03:00",
    "2024-10-11T19:30:00.000-03:00",
    "2024-10-12T17:30:00.000-03:00",
    "2024-10-13T22:00:00.000-03:00",
    "2024-10-14T12:00:00.000-03:00",
]

const items: Play[] = [
    { id: "d9d91b37-8173-49e8-b92d-e02516f16b48", name: 'Fulano de tal', description: lorem.generateParagraphs(5), exhibitionDates: dates,  status: 'active', imageURL: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80', createdAt: '2023-07-11 10:42 AM' },
    { id: "ab1db5a8-c8ea-47d6-9962-e131cec25eda", name: 'Ciclano e tal', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'draft', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-12 10:56 PM' },
    { id: "ac191818-41c5-43a3-a027-5e99154097af", name: 'Gabriel Queiroz', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'archived', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-13 10:56 AM' },
    { id: "3d5c0cc9-0580-47aa-93d6-2e47a7fd79fe", name: 'Will smith', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'archived', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-14 10:32 AM' },
    { id: "a9f0fa54-4d23-42d8-900e-96aaf9de5221", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'active', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "88d83c79-9188-4b42-a250-50b7ae872ccb", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'active', imageURL: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "2c5f1585-9197-4e70-97b9-acbe168fb11e", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'active', imageURL: 'https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "4f2e86e0-9386-4d65-9ba2-da087718846e", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'active', imageURL: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "0d3a3d8d-098c-46f8-ac60-bd3576c2f6ac", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'active', imageURL: 'https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "9d5b4299-6ed5-4e5a-ab0c-887eb250a009", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'active', imageURL: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "ced10fc3-7350-4a31-a93d-23f64a9584f2", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'draft', imageURL: 'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "18d48a9e-bfc5-4a59-85b9-d327a25ab6e2", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'draft', imageURL: 'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "34cac9de-ade2-4e6b-b54b-be7154f70075", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'draft', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "d8ceefb9-1c0d-42dd-a10a-bf0296b5d7a4", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'archived', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "bd13c168-ffda-401b-b69f-c01cebf6e97f", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'archived', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
    { id: "d26ad95b-7788-41d0-934f-96b35a12f133", name: 'Agata', description: lorem.generateParagraphs(5), exhibitionDates: dates, status: 'archived', imageURL: 'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80', createdAt: '2023-07-15 10:40 AM' },
];

export class PlayRepository implements IPlayRepository {

    async getPlayById(id: string): Promise<Play | undefined> {
        const foundItem = items.find((item) => item.id === id);
        return foundItem;
    }

    async getAllPlays(): Promise<Play[]> {
        return items;
    }

    async getAllPlaysPaginated(page: number): Promise<PaginatedData<Play>> {
        const ITEMS_PER_PAGE = 5;
        
        // Calculate the start index and end index for the paginated items
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const paginatedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
        
        // Determine total pages based on the total number of items
        const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

        const paginatedData: PaginatedData<Play> = {
            items: paginatedItems,
            totalPages: totalPages,
            currentPage: page
        };

        return paginatedData;
    }

    // async createReservation(user: Reservation): Promise<Reservation> {
    //     const response = await fetch('/api/users', {
    //         method: 'POST',
    //         body: JSON.stringify(user),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     return await response.json();
    // }
}