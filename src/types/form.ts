export interface FormInput {
    is_valid: boolean;
    validate: () => boolean;
    resetValidation: () => void;
}

export interface FormContext {
    register: (input: Pick<FormInput, 'validate' | 'resetValidation'>) => string;
    unregister: (id: string) => void;
}
