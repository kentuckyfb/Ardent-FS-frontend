export type SystemEntry = {
    type: 'system';
    content: string;
    isLoading?: boolean;
    isError?: boolean;
  };
  
  export type UserEntry = {
    type: 'user';
    content: string;
  };
  
  export type FileResult = {
    name: string;
    path: string;
    type: string;
    size: string;
    modified: string;
    icon: string;
  };
  
  export type ResultsEntry = {
    type: 'results';
    content: FileResult[];
    keywords: string[];
  };
  

  
  export type SearchResponse = {
    keywords: string[];
    results: FileResult[];
  };


  export type CommandHistoryEntry = SystemEntry | UserEntry | ResultsEntry;