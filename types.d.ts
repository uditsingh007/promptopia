export type PromptState = {
  prompt: string;
  tag: string;
  _id?: string;
  creator?: {
    _id: string;
    image: string;
    username: string;
    email: string;
  };
};

export type SetStateFunction = React.Dispatch<
  React.SetStateAction<PromptState>
>;

export type HandleSubmitFunction = (
  e: React.FormEvent<HTMLFormElement>
) => void;

export interface FormProps {
  type: string;
  post: PromptState;
  setPost: SetStateFunction;
  submitting: boolean;
  handleSubmit: HandleSubmitFunction;
}

export interface ProviderProps {
  children?: JSX.Element[] | JSX.Element;
  session?: SessionProviderProps["session"];
}

export interface PromptCardListProps {
  data: PromptState[] | [];
  handleTagClick: (tag: string) => void;
}

export interface PromptCardProps {
  prompt: PromptState;
  handleTagClick?: (tag: string) => void;
  handleDelete?: () => void;
  handleEdit?: () => void;
}

export interface ProfileProps {
  name: string;
  desc: string;
  data: PromptState[];
  handleEdit?: (post: PromptState) => void;
  handleDelete?: (post: PromptState) => void;
}
