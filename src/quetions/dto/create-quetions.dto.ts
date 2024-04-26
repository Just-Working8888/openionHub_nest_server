import { Question } from "../../quetion/quetion.model";

export class CreateQuetionsDto {
    readonly title: string;
    readonly image: string;
    readonly questions: Question[]
}
