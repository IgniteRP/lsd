import { type InjectionKey, type Ref, provide, inject } from 'vue'
import { defineItemStore } from 'client/includes/defineItemStore'
import type { PersonData } from 'server'

export type PersonRef = Ref<PersonData | null>

export const PersonInjectionKey: InjectionKey<PersonRef> = Symbol('Person')

export function providePerson(person: PersonRef) {
	provide(PersonInjectionKey, person)
}

export function injectPerson(): PersonRef {
	const person = inject(PersonInjectionKey)
	if (!person) throw new Error('No person provided')

	return person
}

export const usePeople = defineItemStore<PersonData>('people')
