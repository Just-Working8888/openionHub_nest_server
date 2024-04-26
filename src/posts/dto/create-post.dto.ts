export class CreatePostDto {
    readonly title: string;
    readonly content: string;
    readonly userId: number;
    readonly description: string; // Добавлено поле description
}
