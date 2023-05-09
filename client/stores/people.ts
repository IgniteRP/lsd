import { reactive, type InjectionKey, type Ref, provide, inject } from 'vue'
import { defineStore } from '../includes/functions'

export interface PersonData {
	id: number
	name: string
	created: string
}

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

function loadState(): Map<number, PersonData> {
	const saved = localStorage.getItem('people')
	if (!saved) return new Map()

	return new Map(JSON.parse(saved))
}

function saveState(items: Map<number, PersonData>) {
	localStorage.setItem('people', JSON.stringify(Array.from(items)))
}

export const usePeople = defineStore('people', () => {
	const items = reactive(loadState())

	function create(data: Omit<PersonData, 'id' | 'created'>): PersonData {
		const id = items.size + 1
		const item = { ...data, id, created: new Date().toISOString() }

		items.set(id, item)
		saveState(items)
		return items.get(id)!
	}

	function remove(id: number) {
		items.delete(id)
		saveState(items)
	}

	return {
		items,
		create,
		remove,
	}
})
