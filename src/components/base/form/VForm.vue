<template>
    <form @submit="submit" @reset="resetValidation">
        <input type="submit" class="hidden">

        <slot/>
    </form>
</template>

<script lang="ts">
    // Vue
    import { reactive, provide, computed } from 'vue';

    // Utils
    import { getUniqueId } from '@/utils/index.ts';

    // Types
    import type { FormInput, FormContext } from '@/types/form.ts';

    // Constants
    import { FORM_INJECTION_KEY } from '@/constants/injection-key.ts';
</script>

<script setup lang="ts">
    const emit = defineEmits<{
        (e: 'submit', event: Event): void;
    }>();

    const inputs: Record<string, FormInput> = reactive({});

    const isValid = computed(() => {
        for (const id in inputs) {
            if (!inputs[id].is_valid) {
                return false;
            }
        }

        return true;
    });

    function validate(): void {
        for (const id in inputs) {
            const input = inputs[id];
            input.is_valid = input.validate();
        }
    }

    function resetValidation(): void {
        for (const id in inputs) {
            const input = inputs[id];
            input.resetValidation();
        }
    }

    function submit(event: Event): void {
        event.preventDefault();

        validate();

        if (isValid.value) {
            emit('submit', event);
        }
    }

    provide<FormContext>(FORM_INJECTION_KEY, {
        register(input) {
            const id = getUniqueId();

            inputs[id] = {
                is_valid: false,
                validate: input.validate,
                resetValidation: input.resetValidation
            };

            return id;
        },
        unregister(id) {
            delete inputs[id];
        }
    });
</script>