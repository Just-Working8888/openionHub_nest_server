import { Question } from "../../quetion/quetion.model";

export class CreateQuetionsDto {
    readonly title: string;
    readonly image: string;
    readonly description: string;
    readonly userId: number
    readonly questions: Question[]
}
