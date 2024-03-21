import { defineStore } from 'pinia'

export const usePlayerSetupStore = defineStore('counter', {
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++
        },
    },
})
