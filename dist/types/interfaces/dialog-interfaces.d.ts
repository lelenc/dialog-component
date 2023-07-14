export interface DialogData {
  assistEnabled: boolean;
  defaultAnswers: any[];
  endpointId: string;
  sessionId: string;
  sessionName: string;
  step: {
    fragments: Fragment[];
  };
}
export interface DialogMetadata {
  title: any;
  assistEnabled: boolean;
  iri: string;
  labelExpert: string;
  labelLayman: string;
  label: string;
  metadata: {
    description: string;
    title?: string;
  };
}
export interface Fragment {
  descriptionExpert: string;
  descriptionLayman: string;
  iri: string;
  label: string;
  labelExpert: string;
  labelLayman: string;
  metadata: {
    descriptionLayman: any;
    description: string;
  };
  options: any[];
  optionsExpert: string[];
  optionsLayman: string[];
  type: string;
  answer?: string;
  isPre?: boolean;
}
export interface Answer {
  iri: string;
  answer: string;
}
export interface Result {
  iri: string;
  label: string;
  labelExpert: string;
  labelLayman: string;
  metadata: {
    tag: string[];
  };
  type: string;
}
export interface ConsultationResult {
  title: string;
  user?: {
    name: string;
    mail: string;
    userId?: string;
  };
  player_id?: number;
  host_domain?: string;
  mail?: string;
  startDate: number;
  description?: string;
  endDate: number;
  duration?: number;
  pairs: {
    question: {
      iri?: string;
      label?: string;
      layman: string;
    };
    answer: {
      layman: string;
    };
  }[];
  goal: {
    expert: string;
    layman: string;
  };
  lang: string;
  session?: string;
  model_id?: string;
  region?: number;
  age?: number;
  sex?: number;
  education?: string;
  score: number;
}
