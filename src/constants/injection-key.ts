// Vue
import type { InjectionKey } from 'vue';

// Types
import type { FormContext } from '@/types/form.ts';

const FORM_INJECTION_KEY: InjectionKey<FormContext> = Symbol('FormProvider');

export {
    FORM_INJECTION_KEY
};

