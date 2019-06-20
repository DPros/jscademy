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

export interface CodeModel extends LessonItemInterface {
  type: "code";
  code: string;
  items: CodeItem[];
}

export interface CodeItem {
  code: string;
  result?: string;
}

export interface TaskModel extends LessonItemInterface {
  taskId: number;
  type: "task";
  task: string;
  initialCode?: string;
  code?: string;
  solution: any;
  solutionCode?: any;
}

export interface ImageModel extends LessonItemInterface {
  type: "image";
  name: string;
}

interface LessonItemInterface {
  type: string;
}

export type LessonItem = TextModel | TaskModel | ImageModel;

export type Timestamp = number;
