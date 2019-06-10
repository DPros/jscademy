export interface SectionModel {
  title: string;
  lessons: LessonModel[];
}

export interface LessonModel {
  title: string;
  items: LessonItem[];
}

export interface TextModel extends LessonItemInterface {
  type: "text";
  text: string;
}

export interface TaskModel extends LessonItemInterface {
  type: "task";
  task: string;
  solution: any;
}

export interface ImageModel extends LessonItemInterface {
  type: "image";
  url: string;
}

interface LessonItemInterface {
  type: string;
}

export type LessonItem = TextModel | TaskModel | ImageModel;

export type Timestamp = number;
